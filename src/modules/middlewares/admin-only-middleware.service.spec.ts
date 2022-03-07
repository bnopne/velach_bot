import { ConfigModule, ConfigService } from '@nestjs/config';

import { Context } from 'src/common/types/bot';
import {
  getTestBotInfo,
  getTestingModule,
  getTestTelegram,
} from 'src/common/utils/test-utils';

import { AdminOnlyMiddlewareService } from './admin-only-middleware.service';

describe('Test AdminOnlyMiddlewareService', () => {
  let service: AdminOnlyMiddlewareService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module = await getTestingModule(
      [AdminOnlyMiddlewareService],
      [ConfigModule.forRoot()],
    );

    service = module.get(AdminOnlyMiddlewareService);
    configService = module.get(ConfigService);
  });

  test('Middleware passes if user is bot admin', async () => {
    const tg = getTestTelegram();

    const ctx = new Context(
      {
        update_id: 1,
        message: {
          message_id: 1,
          from: {
            id: 123,
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

    jest.spyOn(configService, 'get').mockReturnValue('123');

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
            id: 123,
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

    const next = jest.fn();

    await service['middleware'](ctx, next);

    expect(next).not.toBeCalled();
  });
});
