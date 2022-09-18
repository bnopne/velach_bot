import { join } from 'path';

import { PoolClient } from 'pg';

import { Context } from 'src/common/types/bot';
import { disconnect } from 'src/common/database/connection';
import { TemplatesService } from 'src/modules/telegram-bot/templates/templates.service';
import {
  getTestingModule,
  getTestTelegram,
  getTestConnection,
  getTestBotInfo,
} from 'src/common/utils/test-utils';
import { USER_IDS } from 'src/common/database/test-database';
import { EntitiesModule } from 'src/modules/entities/entities.module';
import { MiddlewaresModule } from 'src/modules/telegram-bot/middlewares/middlewares.module';
import { TemplatesModule } from 'src/modules/telegram-bot/templates/templates.module';
import { InMemoryStorageModule } from 'src/modules/in-memory-storage/in-memory-storage.module';
import { InMemoryStorageService } from 'src/modules/in-memory-storage/in-memory-storage.service';
import { ConfigurationModule } from 'src/modules/configuration/configuration.module';
import { ConfigurationService } from 'src/modules/configuration/configuration.service';
import { RandomModule } from 'src/modules/random/random.module';
import { RandomService } from 'src/modules/random/random.service';
import { AdminSiteAuthModule } from 'src/modules/admin-site-auth/admin-site-auth.module';

import { AccessAdminSiteCommandService } from './access-admin-site-command.service';

describe('Test AccessAdminSiteCommandService', () => {
  let service: AccessAdminSiteCommandService;
  let connection: PoolClient;
  let templatesService: TemplatesService;
  let randomService: RandomService;
  let inMemoryStorageService: InMemoryStorageService;
  let configurationService: ConfigurationService;

  beforeEach(async () => {
    const module = await getTestingModule(
      [AccessAdminSiteCommandService],
      [
        TemplatesModule,
        MiddlewaresModule,
        EntitiesModule,
        InMemoryStorageModule,
        ConfigurationModule,
        RandomModule,
        AdminSiteAuthModule,
      ],
    );

    service = module.get(AccessAdminSiteCommandService);
    templatesService = module.get(TemplatesService);
    randomService = module.get(RandomService);
    inMemoryStorageService = module.get(InMemoryStorageService);
    configurationService = module.get(ConfigurationService);

    connection = await getTestConnection();
    await connection.query('START TRANSACTION');
  });

  afterEach(async () => {
    await connection.query('ROLLBACK');
    inMemoryStorageService.onModuleDestroy();
    connection.release();
  });

  afterAll(() => {
    return disconnect();
  });

  test('Sends access code for bot admin', async () => {
    const code = '123';
    const getStringMock = jest.fn();
    getStringMock.mockReturnValue(code);
    randomService.getString = getStringMock;

    const text = await templatesService.renderTemplate(
      join(__dirname, 'templates', 'your-code.mustache'),
      { code },
    );

    const tg = getTestTelegram();

    const ctx = new Context(
      {
        update_id: 1,
        message: {
          message_id: 1,
          from: {
            id: parseInt(USER_IDS.BILLY, 10),
            first_name: 'Billy',
            is_bot: false,
          },
          chat: {
            id: 265,
            type: 'private',
            first_name: 'test',
          },
          text: '/accessadminsite',
          date: Date.now(),
        },
      },
      tg,
      getTestBotInfo(),
    );

    ctx.database = {
      connection,
    };

    await service['processMessage'](ctx);

    expect(tg.sendMessage).toBeCalledWith(265, text, {
      parse_mode: 'MarkdownV2',
    });
  });

  test('Does notning if user is not bot admin', async () => {
    const tg = getTestTelegram();

    const ctx = new Context(
      {
        update_id: 1,
        message: {
          message_id: 1,
          from: {
            id: parseInt(USER_IDS.MARK, 10),
            first_name: 'Mark',
            is_bot: false,
          },
          chat: {
            id: 265,
            type: 'private',
            first_name: 'test',
          },
          text: '/accessadminsite',
          date: Date.now(),
        },
      },
      tg,
      getTestBotInfo(),
    );

    ctx.database = {
      connection,
    };

    await service['processMessage'](ctx);

    expect(tg.sendMessage).not.toBeCalled();
  });

  test('Revoke code after TTL is expired', async () => {
    jest.useFakeTimers();

    const code = '123';
    const getStringMock = jest.fn();
    getStringMock.mockReturnValue(code);
    randomService.getString = getStringMock;

    const text = await templatesService.renderTemplate(
      join(__dirname, 'templates', 'your-code.mustache'),
      { code },
    );

    const tg = getTestTelegram();

    const ctx = new Context(
      {
        update_id: 1,
        message: {
          message_id: 1,
          from: {
            id: parseInt(USER_IDS.BILLY, 10),
            first_name: 'Billy',
            is_bot: false,
          },
          chat: {
            id: 265,
            type: 'private',
            first_name: 'test',
          },
          text: '/accessadminsite',
          date: Date.now(),
        },
      },
      tg,
      getTestBotInfo(),
    );

    ctx.database = {
      connection,
    };

    await service['processMessage'](ctx);

    expect(inMemoryStorageService.get(`admin-site-access-code/${code}`)).toBe(
      USER_IDS.BILLY.toString(),
    );

    jest.advanceTimersByTime(
      configurationService.adminSiteAccessCodeTTL * 1000,
    );

    expect(inMemoryStorageService.get(`admin-site-access-code/${code}`)).toBe(
      undefined,
    );

    expect(tg.sendMessage).toBeCalledWith(265, text, {
      parse_mode: 'MarkdownV2',
    });
  });
});
