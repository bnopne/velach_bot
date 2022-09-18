import { TestingModule } from '@nestjs/testing';
import { PoolClient } from 'pg';

import { disconnect } from 'src/common/database/connection';
import {
  getTestConnection,
  getTestingModule,
} from 'src/common/utils/test-utils';

import { UserChatMtm } from './user-chat-mtm.entity';
import { UserChatMtmService } from './user-chat-mtm.service';

const VAN_ID = '2';
const GYM_ID = '1';
const BILLY_ID = '1';

describe('Test UserChatMtmService', () => {
  let service: UserChatMtmService;
  let client: PoolClient;

  beforeEach(async () => {
    const module: TestingModule = await getTestingModule([UserChatMtmService]);
    service = module.get<UserChatMtmService>(UserChatMtmService);
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

  test('find() returns entity if user is in chat', async () => {
    const mtm = await service.find(client, VAN_ID, GYM_ID);
    expect(mtm).toBeInstanceOf(UserChatMtm);
  });

  test('find() returns null if user is not in chat', async () => {
    const mtm = await service.find(client, BILLY_ID, GYM_ID);
    expect(mtm).toBe(null);
  });

  test('get() returns entity if user is in chat', async () => {
    const mtm = await service.get(client, VAN_ID, GYM_ID);
    expect(mtm).toBeInstanceOf(UserChatMtm);
  });

  test('get() throws error if user is not in chat', async () => {
    try {
      await service.get(client, BILLY_ID, GYM_ID);
    } catch (err) {
      expect(err).toBeDefined();
    }
    expect.assertions(1);
  });

  test('create() creates new entity', async () => {
    await service.create(client, BILLY_ID, GYM_ID);
    const mtm = await service.find(client, BILLY_ID, GYM_ID);
    expect(mtm).toBeInstanceOf(UserChatMtm);
  });

  test('createIfNotExists() creates entity if no entity exist', async () => {
    let mtm = await service.find(client, BILLY_ID, GYM_ID);
    expect(mtm).toBe(null);

    await service.createIfNotExists(client, BILLY_ID, GYM_ID);

    mtm = await service.find(client, BILLY_ID, GYM_ID);
    expect(mtm).toBeInstanceOf(UserChatMtm);
  });

  test('createIfNotExists() does nothing if entity already exist', async () => {
    let mtm = await service.find(client, VAN_ID, GYM_ID);
    expect(mtm).toBeInstanceOf(UserChatMtm);

    await service.createIfNotExists(client, VAN_ID, GYM_ID);

    mtm = await service.find(client, VAN_ID, GYM_ID);
    expect(mtm).toBeInstanceOf(UserChatMtm);
  });
});
