import { PoolClient } from 'pg';

import { Context } from 'src/common/types/bot';
import {
  getTestBotInfo,
  getTestConnection,
  getTestingModule,
  getTestTelegram,
} from 'src/common/utils/test-utils';
import { EntitiesModule } from 'src/modules/entities/entities.module';
import { disconnect } from 'src/common/database/connection';

import { AdminOnlyMiddlewareService } from './admin-only-middleware.service';

describe('Test AdminOnlyMiddlewareService', () => {
  let service: AdminOnlyMiddlewareService;
  let connection: PoolClient;

  beforeEach(async () => {
    const module = await getTestingModule(
      [AdminOnlyMiddlewareService],
      [EntitiesModule],
    );

    service = module.get(AdminOnlyMiddlewareService);

    connection = await getTestConnection();
    await connection.query('START TRANSACTION');
  });

  afterEach(async () => {
    await connection.query('ROLLBACK');
    connection.release();
  });

  afterAll(async () => {
    await disconnect();
  });

  test('Middleware passes if user is bot admin', async () => {
    const tg = getTestTelegram();

    const ctx = new Context(
      {
        update_id: 1,
        message: {
          message_id: 1,
          from: {
            id: 1,
            first_name: 'Test',
            is_bot: false,
          },
          chat: {
            id: 265,
            type: 'private',
            first_name: 'test',
          },
          text: 'test',
          date: Date.now(),
        },
      },
      tg,
      getTestBotInfo(),
    );

    ctx.database = { connection };

    const next = jest.fn();

    await service['middleware'](ctx, next);

    expect(next).toBeCalled();
  });

  test('Middleware rejects if no bot admin id provided', async () => {
    const tg = getTestTelegram();

    const ctx = new Context(
      {
        update_id: 1,
        message: {
          message_id: 1,
          from: {
            id: 2,
            first_name: 'Test',
            is_bot: false,
          },
          chat: {
            id: 265,
            type: 'private',
            first_name: 'test',
          },
          text: 'test',
          date: Date.now(),
        },
      },
      tg,
      getTestBotInfo(),
    );

    ctx.database = { connection };

    const next = jest.fn();

    await service['middleware'](ctx, next);

    expect(next).not.toBeCalled();
  });

  test('Middleware rejects if no message provided', async () => {
    const tg = getTestTelegram();

    const ctx = new Context(
      {
        update_id: 1,
      },
      tg,
      getTestBotInfo(),
    );

    ctx.database = { connection };

    const next = jest.fn();

    await service['middleware'](ctx, next);

    expect(next).not.toBeCalled();
  });

  test('Middleware rejects if message has no sender', async () => {
    const tg = getTestTelegram();

    const ctx = new Context(
      {
        update_id: 1,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        message: {
          message_id: 1,
          chat: {
            id: 265,
            type: 'private',
            first_name: 'test',
          },
          text: 'test',
          date: Date.now(),
        },
      },
      tg,
      getTestBotInfo(),
    );

    ctx.database = { connection };

    const next = jest.fn();

    await service['middleware'](ctx, next);

    expect(next).not.toBeCalled();
  });
});
