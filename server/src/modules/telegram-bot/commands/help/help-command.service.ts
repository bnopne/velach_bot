import { join } from 'path';

import { Injectable } from '@nestjs/common';

import { Context, Middleware } from 'src/common/types/bot';
import { getContextMessageOrFail } from 'src/common/utils/telegram-context';
import { composeMiddlewares } from 'src/common/utils/telegram-middlewares';
import { TemplatesService } from 'src/modules/telegram-bot/templates/templates.service';
import { DbMiddlewareService } from 'src/modules/telegram-bot/middlewares/db-middleware.service';
import { PreliminaryDataSaveService } from 'src/modules/telegram-bot/middlewares/preliminary-data-save-middleware.service';
import { FeatureAnalyticsMiddlewareService } from 'src/modules/telegram-bot/middlewares/feature-analytics-middleware.service';
import { MessageAgeMiddlewareService } from 'src/modules/telegram-bot/middlewares/message-age-middleware.service';

@Injectable()
export class HelpCommandService {
  constructor(
    private templatesService: TemplatesService,
    private dbMiddlewareService: DbMiddlewareService,
    private preliminaryDataSaveService: PreliminaryDataSaveService,
    private featureAnalyticsMiddlewareService: FeatureAnalyticsMiddlewareService,
    private messageAgeMiddlewareService: MessageAgeMiddlewareService,
  ) {}

  private async processMessage(ctx: Context): Promise<void> {
    const message = getContextMessageOrFail(ctx);

    const text = await this.templatesService.renderTemplate(
      join(__dirname, 'templates', 'help-message.mustache'),
      {},
    );

    ctx.telegram.sendMessage(message.chat.id, text, {
      parse_mode: 'MarkdownV2',
      link_preview_options: {
        is_disabled: true,
      },
      message_thread_id: message.is_topic_message
        ? message.message_thread_id
        : undefined,
    });
  }

  getMessageMiddleware(): Middleware {
    return composeMiddlewares([
      this.dbMiddlewareService.getMiddleware(),
      this.preliminaryDataSaveService.getMiddleware(),
      this.featureAnalyticsMiddlewareService.getMiddleware('help-command'),
      this.messageAgeMiddlewareService.getMiddleware(),
      this.processMessage.bind(this),
    ]);
  }
}
