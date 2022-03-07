import { join } from 'path';

import { Context } from 'src/common/types/bot';
import {
  getTestBotInfo,
  getTestingModule,
  getTestTelegram,
} from 'src/common/utils/test-utils';
import { MiddlewaresModule } from 'src/modules/middlewares/middlewares.module';
import { TemplatesModule } from 'src/modules/templates/templates.module';
import { TemplatesService } from 'src/modules/templates/templates.service';

import { HelpCommandService } from './help-command.service';

describe('Test HelpCommandService', () => {
  let service: HelpCommandService;
  let templatesService: TemplatesService;

  beforeEach(async () => {
    const module = await getTestingModule(
      [HelpCommandService],
      [MiddlewaresModule, TemplatesModule],
    );

    service = module.get(HelpCommandService);
    templatesService = module.get(TemplatesService);
  });

  test('Service instantiated', async () => {
    expect(service).toBeInstanceOf(HelpCommandService);
  });

  test('Sends rendered template', async () => {
    const text = await templatesService.renderTemplate(
      join(__dirname, 'templates', 'help-message.mustache'),
      {},
    );

    const tg = getTestTelegram();

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
            id: 265,
            type: 'private',
            first_name: 'test',
          },
          text: '/start',
          date: Date.now(),
        },
      },
      tg,
      getTestBotInfo(),
    );

    await service['processMessage'](ctx);

    expect(tg.sendMessage).toBeCalledWith(265, text, {
      parse_mode: 'MarkdownV2',
      disable_web_page_preview: true,
    });
  });
});
