import {
  readFileSync,
  writeFileSync,
  readdirSync,
  existsSync,
  unlinkSync,
} from 'fs';
import { join, parse } from 'path';
import { execSync } from 'child_process';

import { config } from 'dotenv';
import fetch from 'node-fetch';
import { createCommand } from 'commander';
import { format } from 'date-fns';
import { Dropbox } from 'dropbox';
import type { files } from 'dropbox';

import { getConnection, disconnect } from 'src/common/database/connection';
import { seedTestDatabase } from 'src/common/database/test-database';
import { MigrationService } from 'src/modules/entities/migration/migration.service';
import { ConfigurationService } from 'src/modules/configuration/configuration.service';

interface ICliCommand {
  (): Promise<void>;
}

async function execute(command: ICliCommand): Promise<void> {
  try {
    await command();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

async function createTables(): Promise<void> {
  const configService = new ConfigurationService();
  const connection = await getConnection(configService.poolConfig);

  const script = readFileSync(
    join(__dirname, 'common/database/create-tables.sql'),
  );

  try {
    await connection.query(script.toString());
  } catch (err) {
    throw err;
  } finally {
    connection.release();
    await disconnect();
  }
}

async function seedDatabase(): Promise<void> {
  const configService = new ConfigurationService();
  const connection = await getConnection(configService.poolConfig);

  try {
    await seedTestDatabase(connection);
  } catch (err) {
    throw err;
  } finally {
    connection.release();
    await disconnect();
  }
}

async function backupDatabase(filename?: string): Promise<void> {
  const configService = new ConfigurationService();

  const dumpFilename = filename
    ? `${filename}.sql`
    : `velach_bot_database_dump_${format(
        new Date(),
        'dd.MM.yyyy_HH:mm:ss',
      )}.sql`;

  const dumpFullname = join('/tmp', dumpFilename);

  execSync(`pg_dump ${configService.poolConfig.database} > ${dumpFullname}`, {
    env: {
      PGHOST: configService.poolConfig.host,
      PGPORT: configService.poolConfig.port?.toString(),
      PGUSER: configService.poolConfig.user,
      PGPASSWORD: configService.poolConfig.password?.toString(),
    },
  });

  const dropbox = new Dropbox({
    fetch,
    accessToken: configService.getStringValueOrFail('VELACH_BOT_DROPBOX_TOKEN'),
  });

  const dump = readFileSync(dumpFullname);

  await dropbox.filesUpload({
    contents: dump,
    path: `/${dumpFilename}`,
  });

  unlinkSync(dumpFullname);
}

async function donwloadLatestDump(): Promise<void> {
  const configService = new ConfigurationService();

  const dropbox = new Dropbox({
    fetch,
    accessToken: configService.getStringValueOrFail('VELACH_BOT_DROPBOX_TOKEN'),
  });

  const fileInfos: Array<
    files.FileMetadata | files.FolderMetadata | files.DeletedMetadata
  > = [];

  let listResponse = await dropbox.filesListFolder({
    path: '',
    include_deleted: false,
    recursive: false,
    limit: 100,
  });

  if (listResponse.result.entries.length === 0) {
    console.log('No dumps available for download');
    return;
  }

  fileInfos.push(
    ...listResponse.result.entries.filter((e) => e.name.endsWith('.sql')),
  );

  while (listResponse.result.has_more) {
    listResponse = await dropbox.filesListFolderContinue({
      cursor: listResponse.result.cursor,
    });
    fileInfos.push(
      ...listResponse.result.entries.filter((e) => e.name.endsWith('.sql')),
    );
  }

  fileInfos.sort(
    (a, b) =>
      new Date((b as files.FileMetadata).client_modified).getTime() -
      new Date((a as files.FileMetadata).client_modified).getTime(),
  );

  const latestFileInfo = fileInfos[0];

  console.log(`download ${latestFileInfo.name}`);

  const file = await dropbox.filesDownload({
    path: (latestFileInfo as files.FileMetadata).id,
  });

  writeFileSync('velach-bot-latest.sql', (<any>file.result).fileBinary, {
    encoding: 'binary',
  });
}

async function cleanDropboxDumps(): Promise<void> {
  const configService = new ConfigurationService();

  const dropbox = new Dropbox({
    fetch,
    accessToken: configService.getStringValueOrFail('VELACH_BOT_DROPBOX_TOKEN'),
  });

  const fileInfos: Array<
    files.FileMetadata | files.FolderMetadata | files.DeletedMetadata
  > = [];

  let listResponse = await dropbox.filesListFolder({
    path: '',
    include_deleted: false,
    recursive: false,
    limit: 100,
  });

  if (listResponse.result.entries.length === 0) {
    console.log('No dumps found');
    return;
  }

  fileInfos.push(
    ...listResponse.result.entries.filter((e) => e.name.endsWith('.sql')),
  );

  while (listResponse.result.has_more) {
    listResponse = await dropbox.filesListFolderContinue({
      cursor: listResponse.result.cursor,
    });
    fileInfos.push(
      ...listResponse.result.entries.filter((e) => e.name.endsWith('.sql')),
    );
  }

  fileInfos.sort(
    (a, b) =>
      new Date((b as files.FileMetadata).client_modified).getTime() -
      new Date((a as files.FileMetadata).client_modified).getTime(),
  );

  const filesToDelete: files.DeleteArg[] = [];

  fileInfos.slice(1).forEach((f) => {
    if (f.path_lower) {
      filesToDelete.push({ path: f.path_lower });
    }
  });

  await dropbox.filesDeleteBatch({
    entries: filesToDelete,
  });
}

async function createMigrationFile(name: string): Promise<void> {
  const path = join(
    __dirname,
    'common',
    'database',
    'migrations',
    `${new Date().getTime()}-${name}.sql`,
  );

  writeFileSync(path, `-- Migration: ${name}`);
}

async function applyMigrations(): Promise<void> {
  const migrationsDir = join(__dirname, 'common', 'database', 'migrations');

  const migrationFiles = existsSync(migrationsDir)
    ? readdirSync(migrationsDir, { withFileTypes: true })
        .filter((e) => e.isFile)
        .filter((e) => e.name.endsWith('.sql'))
        .map((e) => join(migrationsDir, e.name))
    : [];

  if (!migrationFiles.length) {
    console.log('No migrations found, exit...');
    return;
  }

  const configService = new ConfigurationService();
  const client = await getConnection(configService.poolConfig);
  const migrationService = new MigrationService();

  const appliedMigrations = (await migrationService.getAll(client)).map(
    (m) => m.name,
  );
  const pendingMigrations = migrationFiles.filter(
    (m) => !appliedMigrations.includes(parse(m).name),
  );

  if (pendingMigrations.length === 0) {
    console.warn('No pending migrations found, skip...');
  }

  await client.query('START TRANSACTION');

  try {
    for (const file of pendingMigrations) {
      const migrationName = parse(file).name;
      console.log(`Applying migration ${migrationName}`);

      const existingMigration = await migrationService.findByName(
        client,
        migrationName,
      );
      if (existingMigration) {
        console.warn(`Migration ${migrationName} already applied, skip...`);
        continue;
      }
      await client.query(readFileSync(file).toString());
      await migrationService.create(client, migrationName);
    }

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(`Failed to apply migrations, rollback`);
    throw err;
  } finally {
    client.release();
    await disconnect();
  }
}

config();

const program = createCommand()
  .version('1.0.0')
  .option('--create-tables', 'Creates tables and corresponding stuff in DB')
  .option('--seed-test-db', 'Fills DB with test data')
  .option('--backup-db', 'Creates DB dump and uploads it to Dropbox')
  .option(
    '--download-latest-dump',
    'Tries download latest dump file and save it as velach-bot-latest.sql',
  )
  .option(
    '--clean-dropbox-dumps',
    'Removes all stored dumps except the latest one',
  )
  .option('--create-migration', 'Creates empty migration file')
  .option('--apply-migrations', 'Applies all pending migrations')
  .option('--zip-binaries', 'Zip compiled binaries')
  .parse(process.argv);

let command: ICliCommand = () => Promise.resolve();

if (program.opts().createTables) {
  console.log('execute CREATE TABLES');
  command = createTables;
} else if (program.opts().seedTestDb) {
  console.log('execute SEED TEST DATABASE');
  command = seedDatabase;
} else if (program.opts().backupDb) {
  console.log('execute BACKUP DATABASE');
  command = () => backupDatabase(program.args[0]);
} else if (program.opts().downloadLatestDump) {
  console.log('execute DOWNLOAD LATEST DUMP');
  command = () => donwloadLatestDump();
} else if (program.opts().cleanDropboxDumps) {
  console.log('execute CLEAN DROPBOX DUMPS');
  command = () => cleanDropboxDumps();
} else if (program.opts().createMigration) {
  console.log('execute CREATE MIGRATION FILE');
  command = () => createMigrationFile(program.args[0]);
} else if (program.opts().applyMigrations) {
  console.log('execute APPLY MIGRATIONS');
  command = applyMigrations;
} else {
  console.warn('execute NO-OP');
}

execute(command);
