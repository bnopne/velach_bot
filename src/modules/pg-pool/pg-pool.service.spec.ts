import { Test, TestingModule } from '@nestjs/testing';
import { PoolClient } from 'pg';

import { getConfigModule } from 'src/common/utils/config';
import { PgPoolService } from './pg-pool.service';

describe('Test PgPoolService', () => {
  let service: PgPoolService;
  let connection: PoolClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [getConfigModule()],
      providers: [PgPoolService],
    }).compile();

    service = module.get<PgPoolService>(PgPoolService);
    await service.onModuleInit();
    connection = await service.getConnection();
  });

  afterEach(async () => {
    connection.release();
    await service.onModuleDestroy();
  });

  it('runs code inside transaction and commits if success', async () => {
    async function testFunc(client: PoolClient): Promise<void> {
      client.query('insert into "SequelizeMeta" values (\'some data\')');
    }

    await service.runInTransaction(testFunc);

    const rowsAfter = await connection.query(
      'SELECT FROM "SequelizeMeta" WHERE "name" = \'some data\'',
    );
    expect(rowsAfter.rowCount).toBe(1);

    await connection.query(
      'DELETE FROM "SequelizeMeta" WHERE "name" = \'some data\'',
    );
  });

  it('runs code inside transaction and rolls back if error', async () => {
    async function testFunc(client: PoolClient): Promise<void> {
      client.query('insert into "SequelizeMeta" values (\'some new data\')');
      throw new Error();
    }

    await service.runInTransaction(testFunc);

    const rowsAfter = await connection.query(
      'SELECT FROM "SequelizeMeta" WHERE "name" = \'some new data\'',
    );
    expect(rowsAfter.rowCount).toBe(0);
  });
});
