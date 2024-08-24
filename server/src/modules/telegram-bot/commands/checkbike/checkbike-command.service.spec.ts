import { join } from 'path';

import { PoolClient } from 'pg';

import { USER_IDS } from 'src/common/database/test-database';
import { disconnect } from 'src/common/database/connection';
import { Context } from 'src/common/types/bot';
import {
  getTestBotInfo,
  getTestingModule,
  getTestTelegram,
  getTestConnection,
} from 'src/common/utils/test-utils';
import { MiddlewaresModule } from 'src/modules/telegram-bot/middlewares/middlewares.module';
import { TemplatesModule } from 'src/modules/telegram-bot/templates/templates.module';
import { TemplatesService } from 'src/modules/telegram-bot/templates/templates.service';
import { EntitiesModule } from 'src/modules/entities/entities.module';
import { BikecheckService } from 'src/modules/entities/bikecheck/bikecheck.service';

import { CheckbikeCommandService } from './checkbike-command.service';

describe('Test CheckbikeCommandService', () => {
  let service: CheckbikeCommandService;
  let templatesService: TemplatesService;
  let bikecheckService: BikecheckService;

  let connection: PoolClient;

  beforeEach(async () => {
    const module = await getTestingModule(
      [CheckbikeCommandService],
      [MiddlewaresModule, TemplatesModule, EntitiesModule],
    );

    service = module.get(CheckbikeCommandService);
    templatesService = module.get(TemplatesService);
    bikecheckService = module.get(BikecheckService);

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

  test('Service instantiated', async () => {
    expect(service).toBeInstanceOf(CheckbikeCommandService);
  });

  test('Rejects if no reply to message', async () => {
    const noReplyText = await templatesService.renderTemplate(
      join(__dirname, 'templates', 'no-reply.mustache'),
      {},
    );

    const telegram = getTestTelegram();

    const ctx = new Context(
      {
        update_id: 1,
        message: {
          message_id: 1,
          from: {
            id: 1,
            first_name: 'Vasya',
            is_bot: false,
          },
          chat: {
            id: 265,
            type: 'private',
            first_name: 'test',
          },
          text: '/start',
          date: Date.now(),
        },
      },
      telegram,
      getTestBotInfo(),
    );

    ctx.database = {
      connection,
    };

    await service['processMessage'](ctx);

    expect(telegram.sendMessage).toBeCalledWith(265, noReplyText, {
      message_thread_id: undefined,
      reply_parameters: {
        message_id: 1,
      },
      parse_mode: 'MarkdownV2',
    });
  });

  test('Rejects if reply to message is send by someone else', async () => {
    const notYourMessageText = await templatesService.renderTemplate(
      join(__dirname, 'templates', 'not-your-message.mustache'),
      {},
    );

    const telegram = getTestTelegram();

    const ctx = new Context(
      {
        update_id: 1,
        message: {
          message_id: 2,
          from: {
            id: Number(USER_IDS.VAN),
            first_name: 'Van',
            is_bot: false,
          },
          chat: {
            id: 265,
            type: 'group',
            title: 'test',
          },
          text: '/start',
          date: Date.now(),
          reply_to_message: {
            message_id: 1,
            from: {
              id: Number(USER_IDS.BILLY),
              first_name: 'Billy',
              is_bot: false,
            },
            chat: {
              id: 265,
              type: 'group',
              title: 'test',
            },
            photo: [
              {
                file_id: 'photo-id',
                width: 100,
                height: 100,
                file_unique_id: 'photo-id',
              },
            ],
            date: Date.now(),
            reply_to_message: undefined,
          },
        },
      },
      telegram,
      getTestBotInfo(),
    );

    ctx.database = {
      connection,
    };

    await service['processMessage'](ctx);

    expect(telegram.sendMessage).toBeCalledWith(265, notYourMessageText, {
      message_thread_id: undefined,
      reply_parameters: {
        message_id: 2,
      },
      parse_mode: 'MarkdownV2',
    });
  });

  test('Rejects if reply to message has no photo', async () => {
    const noPhotoText = await templatesService.renderTemplate(
      join(__dirname, 'templates', 'no-photo.mustache'),
      {},
    );

    const telegram = getTestTelegram();

    const ctx = new Context(
      {
        update_id: 1,
        message: {
          message_id: 2,
          from: {
            id: Number(USER_IDS.VAN),
            first_name: 'Van',
            is_bot: false,
          },
          chat: {
            id: 265,
            type: 'group',
            title: 'test',
          },
          text: '/start',
          date: Date.now(),
          reply_to_message: {
            message_id: 1,
            from: {
              id: Number(USER_IDS.VAN),
              first_name: 'Van',
              is_bot: false,
            },
            chat: {
              id: 265,
              type: 'group',
              title: 'test',
            },
            photo: [],
            date: Date.now(),
            reply_to_message: undefined,
          },
        },
      },
      telegram,
      getTestBotInfo(),
    );

    ctx.database = {
      connection,
    };

    await service['processMessage'](ctx);

    expect(telegram.sendMessage).toBeCalledWith(265, noPhotoText, {
      message_thread_id: undefined,
      reply_parameters: {
        message_id: 2,
      },
      parse_mode: 'MarkdownV2',
    });
  });

  test('Creates new bikecheck if everything is OK', async () => {
    const doneText = await templatesService.renderTemplate(
      join(__dirname, 'templates', 'done.mustache'),
      {},
    );

    const telegram = getTestTelegram();

    const ctx = new Context(
      {
        update_id: 1,
        message: {
          message_id: 2,
          from: {
            id: Number(USER_IDS.BILLY),
            first_name: 'Billy',
            is_bot: false,
          },
          chat: {
            id: 265,
            type: 'group',
            title: 'test',
          },
          text: '/start',
          date: Date.now(),
          reply_to_message: {
            message_id: 1,
            from: {
              id: Number(USER_IDS.BILLY),
              first_name: 'Billy',
              is_bot: false,
            },
            chat: {
              id: 265,
              type: 'group',
              title: 'test',
            },
            photo: [
              {
                file_id: 'photo-id',
                width: 100,
                height: 100,
                file_unique_id: 'photo-id',
              },
            ],
            date: Date.now(),
            reply_to_message: undefined,
          },
        },
      },
      telegram,
      getTestBotInfo(),
    );

    ctx.database = {
      connection,
    };

    await service['processMessage'](ctx);

    expect(telegram.sendMessage).toBeCalledWith(265, doneText, {
      message_thread_id: undefined,
      reply_parameters: {
        message_id: 2,
      },
      parse_mode: 'MarkdownV2',
    });

    const bikechecks = await bikecheckService.findActive(
      connection,
      USER_IDS.BILLY,
    );
    expect(bikechecks[0].telegramImageId).toBe('photo-id');
  });
});
