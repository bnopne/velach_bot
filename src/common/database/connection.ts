import { Pool, PoolClient, ClientConfig } from 'pg';
import { ConfigService } from '@nestjs/config';

export interface IRunWithPGConnection<T> {
  (connection: PoolClient, ...args: any[]): Promise<T>;
}

let pool: Pool;

function getPool(config: ClientConfig): Pool {
  if (!pool) {
    pool = new Pool(config);
  }

  return pool;
}

export async function getConnection(
  configService: ConfigService,
): Promise<PoolClient> {
  return getPool({
    host: configService.get<string>('VELACH_BOT_DB_HOST'),
    port: configService.get<number>('VELACH_BOT_DB_PORT'),
    database: configService.get<string>('VELACH_BOT_DB_DATABASE'),
    user: configService.get<string>('VELACH_BOT_DB_USER'),
    password: configService.get<string>('VELACH_BOT_DB_PASSWORD'),
  }).connect();
}

export async function disconnect(): Promise<void> {
  return pool.end();
}

export async function runAndRollback<T>(
  configService: ConfigService,
  f: IRunWithPGConnection<T>,
): Promise<void> {
  const connection = await getConnection(configService);
  await connection.query('START TRANSACTION');

  try {
    await f(connection);
  } catch (err) {}

  await connection.query('ROLLBACK');
  connection.release();
}
