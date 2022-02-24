import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join, parse } from 'path';
import { execSync } from 'child_process';

import fetch from 'node-fetch';
import { createCommand } from 'commander';
import { noop } from 'lodash';
import { format } from 'date-fns';
import { Dropbox } from 'dropbox';

import { getConnection, disconnect } from 'src/common/database/connection';
import { seedTestDatabase } from 'src/common/database/test-database';
import { getConfigService } from 'src/common/utils/config';
import { MigrationService } from 'src/modules/entities/migration/migration.service';

interface ICliCommand {
  (): Promise<void>;
}

async function execute(command: ICliCommand): Promise<void> {
  try {
    await command();
  } catch (err) {
    console.error(err);
  }
}

async function noopCommand(): Promise<void> {
  noop();
}

async function createTables(): Promise<void> {
  const configService = await getConfigService();
  const connection = await getConnection(configService);

  const script = readFileSync('./src/common/database/create-tables.sql');

  try {
    await connection.query(script.toString());
  } catch (err) {
    console.error(err);
  } finally {
    connection.release();
    await disconnect();
  }
}

async function seedDatabase(): Promise<void> {
  const configService = await getConfigService();
  const connection = await getConnection(configService);

  try {
    await seedTestDatabase(connection);
  } catch (err) {
    console.error(err);
  } finally {
    connection.release();
    await disconnect();
  }
}

async function backupDatabase(backupName?: string): Promise<void> {
  const configService = await getConfigService();

  const dumpFilename = backupName
    ? `${backupName}.sql`
    : `velach_bot_database_dump_${format(
        new Date(),
        'dd.MM.yyyy_HH:mm:ss',
      )}.sql`;
  const dumpFullname = join('/tmp', dumpFilename);

  execSync(
    `pg_dump ${configService.get<string>(
      'VELACH_BOT_DB_DATABASE',
    )} > ${dumpFullname}`,
    {
      env: {
        PGHOST: configService.get<string>('VELACH_BOT_DB_HOST'),
        PGPORT: configService.get<string>('VELACH_BOT_DB_PORT'),
        PGUSER: configService.get<string>('VELACH_BOT_DB_USER'),
        PGPASSWORD: configService.get<string>('VELACH_BOT_DB_PASSWORD'),
      },
    },
  );

  const dropbox = new Dropbox({
    fetch,
    accessToken: configService.get<string>('VELACH_BOT_DROPBOX_TOKEN'),
  });

  const dump = readFileSync(dumpFullname);

  await dropbox.filesUpload({
    contents: dump,
    path: `/${dumpFilename}`,
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

  const configService = await getConfigService();
  const migrationService = new MigrationService();
  const client = await getConnection(configService);

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
    console.error(`Failed to apply migrations, rollback`);
    console.error(err);
    await client.query('ROLLBACK');
  } finally {
    client.release();
    await disconnect();
  }
}

const program = createCommand();

program
  .version('1.0.0')
  .option('--create-tables', 'Creates tables and corresponding stuff in DB')
  .option('--seed-test-db', 'Fills DB with test data')
  .option('--backup-db', 'Creates DB dump and uploads it to Dropbox')
  .option('--create-migration', 'Creates empty migration file')
  .option('--apply-migrations', 'Applies all pending migrations');

program.parse(process.argv);

let command: ICliCommand = noopCommand;

if (program.opts().createTables) {
  console.log('execute CREATE TABLES');
  command = createTables;
} else if (program.opts().seedTestDb) {
  console.log('execute SEED TEST DATABASE');
  command = seedDatabase;
} else if (program.opts().backupDb) {
  console.log('execute BACKUP DATABASE');
  command = () => backupDatabase(program.args[0]);
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
