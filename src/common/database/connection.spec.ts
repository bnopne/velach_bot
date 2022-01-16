import { ConfigService } from '@nestjs/config';
import { PoolClient } from 'pg';

import { getConfigService } from 'src/common/utils/config';

import { getConnection, runAndRollback, disconnect } from './connection';

describe('Test connection module', () => {
  let configService: ConfigService;
  let connection: PoolClient;

  beforeAll(async () => {
    configService = await getConfigService();
    connection = await getConnection(configService);
  });

  afterAll(() => {
    connection.release();
    disconnect();
  });

  it('runs queries and rollback', async () => {
    async function testFunc(client: PoolClient): Promise<void> {
      client.query('INSERT INTO "SequelizeMeta" VALUES (\'123\')');
    }

    const rowsBefore = await connection.query(
      'SELECT FROM "SequelizeMeta" WHERE "name" = \'123\'',
    );

    expect(rowsBefore.rowCount).toBe(0);

    await runAndRollback(configService, testFunc);

    const rowsAfter = await connection.query(
      'SELECT FROM "SequelizeMeta" WHERE "name" = \'123\'',
    );

    expect(rowsAfter.rowCount).toBe(0);
  });
});
