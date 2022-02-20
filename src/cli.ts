import { promises as fs } from 'fs';
import { join } from 'path';

import { NestFactory } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { createCommand } from 'commander';
import { noop } from 'lodash';

import { getConnection, disconnect } from 'src/common/database/connection';
import { seedTestDatabase } from 'src/common/database/test-database';

interface ICliCommand {
  (): Promise<void>;
}

async function getConfigService(): Promise<ConfigService> {
  const configModule = await NestFactory.create(
    ConfigModule.forRoot({ envFilePath: join(process.cwd(), '.env') }),
  );
  return configModule.get(ConfigService);
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

  const script = await fs.readFile('./src/common/database/create-tables.sql');

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

const program = createCommand();

program
  .version('1.0.0')
  .option('--create-tables', 'Syncronize ORM models to DB')
  .option('--seed-test-db', 'Fills database with test data');

program.parse(process.argv);

let command: ICliCommand = noopCommand;

if (program.opts().createTables) {
  console.log('execute CREATE TABLES');
  command = createTables;
} else if (program.opts().seedTestDb) {
  console.log('execute SEED TEST DATABASE');
  command = seedDatabase;
} else {
  console.warn('execute NO-OP');
}

execute(command);
