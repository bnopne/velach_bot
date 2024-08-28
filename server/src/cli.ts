import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join, parse } from 'path';
import { execSync } from 'child_process';

import { config } from 'dotenv';
import { createCommand } from 'commander';
import { format } from 'date-fns';

import { getConnection, disconnect } from 'src/common/database/connection';
import { seedTestDatabase } from 'src/common/database/test-database';
import { MigrationService } from 'src/modules/entities/migration/migration.service';
import { ConfigurationService } from 'src/modules/configuration/configuration.service';

type ICliCommand = {
  (): Promise<void>;
};

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

async function dropTables(): Promise<void> {
  const configService = new ConfigurationService();
  const connection = await getConnection(configService.poolConfig);

  const script = readFileSync(
    join(__dirname, 'common/database/drop-tables.sql'),
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
  .option('--drop-tables', 'Drops tables and corresponding stuff in DB')
  .option('--seed-test-db', 'Fills DB with test data')
  .option('--backup-db', 'Creates DB dump')
  .option('--create-migration', 'Creates empty migration file')
  .option('--apply-migrations', 'Applies all pending migrations')
  .option('--zip-binaries', 'Zip compiled binaries')
  .parse(process.argv);

let command: ICliCommand = () => Promise.resolve();

if (program.opts().createTables) {
  console.log('execute CREATE TABLES');
  command = createTables;
} else if (program.opts().dropTables) {
  console.log('execute DROP TABLES');
  command = dropTables;
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
