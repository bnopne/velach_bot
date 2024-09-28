import { Pool, type PoolConfig, type PoolClient, type ClientConfig } from 'pg';

export type TRunWithPGConnection<T> = {
  (connection: PoolClient, ...args: any[]): Promise<T>;
};

let pool: Pool;

function getPool(config: ClientConfig): Pool {
  if (!pool) {
    pool = new Pool(config);
  }

  return pool;
}

export async function getConnection(
  poolConfig: PoolConfig,
): Promise<PoolClient> {
  return getPool(poolConfig).connect();
}

export async function disconnect(): Promise<void> {
  return pool.end();
}
