import { type Request } from 'express';
import { type PoolClient } from 'pg';

type TWrappedFunc<TResult> = (...args: unknown[]) => Promise<TResult>;

export function wrapInTransaction<TResult>(
  connection: PoolClient,
  func: TWrappedFunc<TResult>,
): TWrappedFunc<TResult> {
  return async function (...args: unknown[]): Promise<TResult> {
    await connection.query('START TRANSACTION');

    let result: TResult;

    try {
      result = await func(...args);
    } catch (err) {
      await connection.query('START TRANSACTION');
      throw err;
    }

    await connection.query('COMMIT');

    return result;
  };
}

export function getRequestDbConnectionOrFail(request: Request): PoolClient {
  if (!request.dbConnection) {
    throw new Error('No DB connection found in request object');
  }

  return request.dbConnection;
}
