import { config } from 'dotenv';
import { createCommand } from 'commander';

import { execute, logger } from './cli-commands/common';
import { type ICliCommand } from './cli-commands/types';
import { applyMigrations } from './cli-commands/apply-migrations';
import { createDbDump } from './cli-commands/create-db-dump';
import { createMigration } from './cli-commands/create-migration';
import { createTables } from './cli-commands/create-tables';
import { dropTables } from './cli-commands/drop-tables';
import { seedTestDb } from './cli-commands/seed-test-db';
import { cleanupDumpDirectory } from './cli-commands/cleanup-dump-directory';

config();

const program = createCommand()
  .version('2.0.0')
  .option('--create-tables', 'Creates tables and corresponding stuff in DB')
  .option('--drop-tables', 'Drops tables and corresponding stuff in DB')
  .option('--seed-test-db', 'Fills DB with test data')
  .option('--backup-db <args...>', 'Creates DB dump')
  .option('--cleanup-dump-directory <arg>', 'Removes old DB dumps')
  .option('--create-migration <arg>', 'Creates empty migration file')
  .option('--apply-migrations', 'Applies all pending migrations')
  .parse(process.argv);

let command: ICliCommand = () => Promise.reject('unknown CLI params');

logger.log('parse CLI arguments');

const options = program.opts();

logger.log(JSON.stringify(options, null, 2));

if (options.createTables) {
  console.debug('execute CREATE TABLES');
  command = createTables;
} else if (options.dropTables) {
  console.debug('execute DROP TABLES');
  command = dropTables;
} else if (options.seedTestDb) {
  console.debug('execute SEED TEST DATABASE');
  command = seedTestDb;
} else if (options.backupDb) {
  console.debug('execute BACKUP DATABASE');
  command = () => createDbDump(options.backupDb[0], options.backupDb[1]);
} else if (options.cleanupDumpDirectory) {
  command = () => cleanupDumpDirectory(options.cleanupDumpDirectory);
} else if (options.createMigration) {
  console.debug('execute CREATE MIGRATION FILE');
  command = () => createMigration(options.createMigration);
} else if (options.applyMigrations) {
  console.debug('execute APPLY MIGRATIONS');
  command = applyMigrations;
}

execute(command);
