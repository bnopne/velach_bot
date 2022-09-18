import { TestingModule } from '@nestjs/testing';
import { PoolClient } from 'pg';

import { disconnect } from 'src/common/database/connection';
import {
  getTestConnection,
  getTestingModule,
} from 'src/common/utils/test-utils';

import { Migration } from './migration.entity';
import { MigrationService } from './migration.service';

describe('Test MigrationService', () => {
  let service: MigrationService;
  let client: PoolClient;

  beforeEach(async () => {
    const module: TestingModule = await getTestingModule([MigrationService]);
    service = module.get<MigrationService>(MigrationService);
    client = await getTestConnection();
    await client.query('START TRANSACTION');
  });

  afterEach(async () => {
    await client.query('ROLLBACK');
    client.release();
  });

  afterAll(async () => {
    await disconnect();
  });

  test('create() creates new migration', async () => {
    await service.create(client, 'test');
    const m = await service.findByName(client, 'test');
    expect(m).toBeInstanceOf(Migration);
    expect(m?.name).toBe('test');
  });

  test('getAll() returns all migrations', async () => {
    let m = await service.getAll(client);
    expect(m.length).toBe(0);

    await service.create(client, 'test');
    await service.create(client, 'test2');

    m = await service.getAll(client);
    expect(m.length).toBe(2);
  });

  test('findByName() returns entity if it exists', async () => {
    await service.create(client, 'test');
    await service.create(client, 'test2');
    const m = await service.findByName(client, 'test2');
    expect(m).toBeInstanceOf(Migration);
  });

  test('findByName() returns null if entity does not exist', async () => {
    await service.create(client, 'test');
    await service.create(client, 'test2');
    const m = await service.findByName(client, 'test3');
    expect(m).toBe(null);
  });
});
