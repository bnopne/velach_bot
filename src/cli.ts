import { readFileSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

import fetch from 'node-fetch';
import { createCommand } from 'commander';
import { noop } from 'lodash';
import { format } from 'date-fns';
import { Dropbox } from 'dropbox';

import { getConnection, disconnect } from 'src/common/database/connection';
import { seedTestDatabase } from 'src/common/database/test-database';
import {
  getTestingModule,
  getTestConfigService,
} from 'src/common/utils/test-utils';

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
  const configService = await getTestConfigService(await getTestingModule([]));
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
  const configService = await getTestConfigService(await getTestingModule([]));
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

async function backupDatabase(): Promise<void> {
  const configService = await getTestConfigService(await getTestingModule([]));

  const dumpFilename = `velach_bot_database_dump_${format(
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

const program = createCommand();

program
  .version('1.0.0')
  .option('--create-tables', 'Creates tables and corresponding stuff in DB')
  .option('--seed-test-db', 'Fills DB with test data')
  .option('--backup-db', 'Creates DB dump and uploads it to Dropbox');

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
  command = backupDatabase;
} else {
  console.warn('execute NO-OP');
}

execute(command);
