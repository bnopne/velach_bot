import { join } from 'path';

import { PoolClient } from 'pg';

import { USER_IDS } from 'src/common/database/test-database';
import { Context } from 'src/common/types/bot';
import { disconnect } from 'src/common/database/connection';
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

import { SetStravaCommandService } from './set-strava-command.service';

describe('Test SetStravaCommandService', () => {
  let service: SetStravaCommandService;
  let templatesService: TemplatesService;
  let connection: PoolClient;

  beforeEach(async () => {
    const module = await getTestingModule(
      [SetStravaCommandService],
      [MiddlewaresModule, TemplatesModule, EntitiesModule],
    );

    service = module.get(SetStravaCommandService);
    templatesService = module.get(TemplatesService);
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
    expect(service).toBeInstanceOf(SetStravaCommandService);
  });

  test('Sets strava link for numeric athlete id', async () => {
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
            type: 'private',
            first_name: 'Billy',
          },
          text: '/setstrava',
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
              type: 'private',
              first_name: 'Billy',
            },
            text: 'https://www.strava.com/athletes/123456',
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

    await service['processCommand'](ctx);

    expect(telegram.sendMessage).toBeCalledWith(265, doneText, {
      reply_to_message_id: 2,
      parse_mode: 'MarkdownV2',
    });
  });

  test('Sets strava link for alhpanumeric athlete id', async () => {
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
            type: 'private',
            first_name: 'Billy',
          },
          text: '/setstrava',
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
              type: 'private',
              first_name: 'Billy',
            },
            text: 'https://www.strava.com/athletes/123456test',
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

    await service['processCommand'](ctx);

    expect(telegram.sendMessage).toBeCalledWith(265, doneText, {
      reply_to_message_id: 2,
      parse_mode: 'MarkdownV2',
    });
  });

  test('Sets strava link for alhpanumeric athlete id with underscores and dashes', async () => {
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
            type: 'private',
            first_name: 'Billy',
          },
          text: '/setstrava',
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
              type: 'private',
              first_name: 'Billy',
            },
            text: 'https://www.strava.com/athletes/123456-test_test',
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

    await service['processCommand'](ctx);

    expect(telegram.sendMessage).toBeCalledWith(265, doneText, {
      reply_to_message_id: 2,
      parse_mode: 'MarkdownV2',
    });
  });

  test('Rejects on invalid string', async () => {
    const invalidLinkText = await templatesService.renderTemplate(
      join(__dirname, 'templates', 'invalid-link.mustache'),
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
            type: 'private',
            first_name: 'Billy',
          },
          text: '/setstrava',
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
              type: 'private',
              first_name: 'Billy',
            },
            text: 'httpwww.srava.com/athletes/123456',
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

    await service['processCommand'](ctx);

    expect(telegram.sendMessage).toBeCalledWith(265, invalidLinkText, {
      reply_to_message_id: 2,
      parse_mode: 'MarkdownV2',
    });
  });

  test('Rejects if no reply message provided', async () => {
    const noReplyToText = await templatesService.renderTemplate(
      join(__dirname, 'templates', 'no-reply-to.mustache'),
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
            type: 'private',
            first_name: 'Billy',
          },
          text: '/setstrava',
          date: Date.now(),
        },
      },
      telegram,
      getTestBotInfo(),
    );

    ctx.database = {
      connection,
    };

    await service['processCommand'](ctx);

    expect(telegram.sendMessage).toBeCalledWith(265, noReplyToText, {
      reply_to_message_id: 2,
      parse_mode: 'MarkdownV2',
    });
  });

  test('Rejects if reply message is from another user', async () => {
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
            id: Number(USER_IDS.BILLY),
            first_name: 'Billy',
            is_bot: false,
          },
          chat: {
            id: 265,
            type: 'private',
            first_name: 'Billy',
          },
          text: '/setstrava',
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
              type: 'private',
              first_name: 'Billy',
            },
            text: 'https://www.strava.com/athletes/123456',
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

    await service['processCommand'](ctx);

    expect(telegram.sendMessage).toBeCalledWith(265, notYourMessageText, {
      reply_to_message_id: 2,
      parse_mode: 'MarkdownV2',
    });
  });
});
