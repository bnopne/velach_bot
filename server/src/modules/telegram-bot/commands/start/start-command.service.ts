import { join } from 'path';

import { Injectable } from '@nestjs/common';

import { Context, Middleware } from 'src/common/types/bot';
import { TemplatesService } from 'src/modules/telegram-bot/templates/templates.service';
import {
  getMessageChatOrFail,
  getContextMessageOrFail,
} from 'src/common/utils/telegram-context';
import { composeMiddlewares } from 'src/common/utils/telegram-middlewares';
import { DbMiddlewareService } from 'src/modules/telegram-bot/middlewares/db-middleware.service';
import { PreliminaryDataSaveService } from 'src/modules/telegram-bot/middlewares/preliminary-data-save-middleware.service';
import { PrivateChatsOnlyMiddlewareService } from 'src/modules/telegram-bot/middlewares/private-chats-only-middleware.service';
import { FeatureAnalyticsMiddlewareService } from 'src/modules/telegram-bot/middlewares/feature-analytics-middleware.service';
import { MessageAgeMiddlewareService } from 'src/modules/telegram-bot/middlewares/message-age-middleware.service';

@Injectable()
export class StartCommandService {
  constructor(
    private templatesService: TemplatesService,
    private dbMiddlewareService: DbMiddlewareService,
    private preliminaryDataSaveService: PreliminaryDataSaveService,
    private privateChatsOnlyMiddlewareService: PrivateChatsOnlyMiddlewareService,
    private featureAnalyticsMiddlewareService: FeatureAnalyticsMiddlewareService,
    private messageAgeMiddlewareService: MessageAgeMiddlewareService,
  ) {}

  private async processMessage(ctx: Context): Promise<void> {
    const message = getContextMessageOrFail(ctx);
    const chat = getMessageChatOrFail(message);

    const text = await this.templatesService.renderTemplate(
      join(__dirname, 'templates', 'greeting.mustache'),
      {},
    );

    ctx.telegram.sendMessage(chat.id, text, {
      reply_parameters: {
        message_id: message.message_id,
      },
      parse_mode: 'MarkdownV2',
      message_thread_id: message.is_topic_message
        ? message.message_thread_id
        : undefined,
    });
  }

  getMessageMiddleware(): Middleware {
    return composeMiddlewares([
      this.dbMiddlewareService.getMiddleware(),
      this.preliminaryDataSaveService.getMiddleware(),
      this.privateChatsOnlyMiddlewareService.getMiddleware(),
      this.featureAnalyticsMiddlewareService.getMiddleware(
        'start-command/message-command',
      ),
      this.messageAgeMiddlewareService.getMiddleware(),
      this.processMessage.bind(this),
    ]);
  }
}
