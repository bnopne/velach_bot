import { TestingModule } from '@nestjs/testing';
import { PoolClient } from 'pg';

import { disconnect } from 'src/common/database/connection';
import {
  getTestConnection,
  getTestingModule,
} from 'src/common/utils/test-utils';

import { Chat } from './chat.entity';
import { ChatService } from './chat.service';

describe('Test ChatService', () => {
  let service: ChatService;
  let connection: PoolClient;

  beforeEach(async () => {
    const module: TestingModule = await getTestingModule([ChatService]);
    service = module.get<ChatService>(ChatService);
    connection = await getTestConnection(module);
    await connection.query('START TRANSACTION');
  });

  afterEach(async () => {
    await connection.query('ROLLBACK');
    connection.release();
  });

  afterAll(async () => {
    await disconnect();
  });

  test('findById() returns existing chat', async () => {
    const gym = await service.findById(connection, '1');
    expect(gym).toBeInstanceOf(Chat);
    expect(gym?.id).toBe('1');
    expect(gym?.title).toBe('Gym');
    expect(gym?.type).toBe('supergroup');
  });

  test('findById() returns null if chat does not exist', async () => {
    const gym = await service.findById(connection, '100500');
    expect(gym).toBe(null);
  });

  test('getById() returns chat', async () => {
    const gym = await service.getById(connection, '1');
    expect(gym).toBeInstanceOf(Chat);
    expect(gym.id).toBe('1');
    expect(gym.title).toBe('Gym');
    expect(gym.type).toBe('supergroup');
  });

  test('getById() throws error if chat does not exist', async () => {
    try {
      await service.getById(connection, '100500');
    } catch (err) {
      expect(err).not.toBe(null);
    }

    expect.assertions(1);
  });

  test('createChat() creates chat', async () => {
    const chatNextDoor = new Chat({
      id: '265',
      title: undefined,
      type: 'private',
    });

    await service.createChat(connection, chatNextDoor);
    expect(await service.getById(connection, '265')).toBeInstanceOf(Chat);
  });

  test('updateChat() updates chat', async () => {
    let gym = await service.getById(connection, '1');
    gym.title = 'foo';
    await service.updateChat(connection, gym);
    gym = await service.getById(connection, '1');
    expect(gym.title).toBe('foo');
  });

  test('createOrUpdateChat() creates chat if chat does not exist', async () => {
    const chatNextDoor = new Chat({
      id: '265',
      title: undefined,
      type: 'private',
    });

    await service.createOrUpdateChat(connection, chatNextDoor);
    expect(await service.getById(connection, '265')).toBeInstanceOf(Chat);
  });

  test('createOrUpdateChat() updates existing chat', async () => {
    const chat = new Chat({
      id: '1',
      title: undefined,
      type: 'private',
    });

    await service.createOrUpdateChat(connection, chat);

    const gym = await service.getById(connection, '1');
    expect(gym).toBeInstanceOf(Chat);
    expect(gym.id).toBe('1');
    expect(gym.title).toBe(null);
    expect(gym.type).toBe('private');
  });
});
