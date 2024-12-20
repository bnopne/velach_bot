import { config } from 'dotenv';
import { createCommand } from 'commander';

import { execute } from './cli-commands/common';
import { type ICliCommand } from './cli-commands/types';
import { applyMigrations } from './cli-commands/apply-migrations';
import { createDbDump } from './cli-commands/create-db-dump';
import { createMigration } from './cli-commands/create-migration';
import { createTables } from './cli-commands/create-tables';
import { dropTables } from './cli-commands/drop-tables';
import { seedTestDb } from './cli-commands/seed-test-db';
import { cleanDbDumps } from './cli-commands/clean-db-dumps';

config();

const program = createCommand()
  .version('1.0.0')
  .option('--create-tables', 'Creates tables and corresponding stuff in DB')
  .option('--drop-tables', 'Drops tables and corresponding stuff in DB')
  .option('--seed-test-db', 'Fills DB with test data')
  .option('--backup-db', 'Creates DB dump')
  .option('--clean-old-dumps', 'Removes old DM dumps')
  .option('--create-migration', 'Creates empty migration file')
  .option('--apply-migrations', 'Applies all pending migrations')
  .parse(process.argv);

let command: ICliCommand = () => Promise.reject('unknown CLI params');

if (program.opts().createTables) {
  console.debug('execute CREATE TABLES');
  command = createTables;
} else if (program.opts().dropTables) {
  console.debug('execute DROP TABLES');
  command = dropTables;
} else if (program.opts().seedTestDb) {
  console.debug('execute SEED TEST DATABASE');
  command = seedTestDb;
} else if (program.opts().backupDb) {
  console.debug('execute BACKUP DATABASE');
  command = () => createDbDump(program.args[0], program.args[1]);
} else if (program.opts().cleanOldDumps) {
  console.debug('execute CLEAN OLD DUMPS');
  command = () => cleanDbDumps(program.args[0]);
} else if (program.opts().createMigration) {
  console.debug('execute CREATE MIGRATION FILE');
  command = () => createMigration(program.args[0]);
} else if (program.opts().applyMigrations) {
  console.debug('execute APPLY MIGRATIONS');
  command = applyMigrations;
}

execute(command);
