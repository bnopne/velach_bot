import { join } from 'path';

import { Context } from 'src/common/types/bot';
import {
  getTestBotInfo,
  getTestingModule,
  getTestTelegram,
} from 'src/common/utils/test-utils';
import { MiddlewaresModule } from 'src/modules/telegram-bot/middlewares/middlewares.module';
import { TemplatesModule } from 'src/modules/telegram-bot/templates/templates.module';
import { TemplatesService } from 'src/modules/telegram-bot/templates/templates.service';

import { StartCommandService } from './start-command.service';

describe('Test StartCommandService', () => {
  let service: StartCommandService;
  let templatesService: TemplatesService;

  beforeEach(async () => {
    const module = await getTestingModule(
      [StartCommandService],
      [MiddlewaresModule, TemplatesModule],
    );

    service = module.get(StartCommandService);
    templatesService = module.get(TemplatesService);
  });

  test('Service instantiated', async () => {
    expect(service).toBeInstanceOf(StartCommandService);
  });

  test('Sends rendered template', async () => {
    const text = await templatesService.renderTemplate(
      join(__dirname, 'templates', 'greeting.mustache'),
      {},
    );

    const telegram = getTestTelegram();

    const ctx = new Context(
      {
        update_id: 1,
        message: {
          message_id: 265,
          from: {
            id: 1,
            first_name: 'Vasya',
            is_bot: false,
          },
          chat: {
            id: 1,
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

    await service['processMessage'](ctx);

    expect(telegram.sendMessage).toBeCalledWith(1, text, {
      message_thread_id: undefined,
      reply_parameters: {
        message_id: 265,
      },
      parse_mode: 'MarkdownV2',
    });
  });
});
