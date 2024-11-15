import { PoolClient } from 'pg';

type WrappedFunc<TResult> = (...args: unknown[]) => Promise<TResult>;

export function wrapInTransaction<TResult>(
  connection: PoolClient,
  func: WrappedFunc<TResult>,
): WrappedFunc<TResult> {
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
