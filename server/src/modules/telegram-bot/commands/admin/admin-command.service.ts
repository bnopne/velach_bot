import { Injectable } from '@nestjs/common';
import { join } from 'path';

import { TemplatesService } from 'src/modules/telegram-bot/templates/templates.service';
import { DbMiddlewareService } from 'src/modules/telegram-bot/middlewares/db-middleware.service';
import { PreliminaryDataSaveService } from 'src/modules/telegram-bot/middlewares/preliminary-data-save-middleware.service';
import { PrivateChatsOnlyMiddlewareService } from 'src/modules/telegram-bot/middlewares/private-chats-only-middleware.service';
import { composeMiddlewares } from 'src/common/utils/telegram-middlewares';
import {
  getContextConnectionOrFail,
  getMessageFromOrFail,
  getContextMessageOrFail,
} from 'src/common/utils/telegram-context';
import { Context, Middleware } from 'src/common/types/bot';
import { UserService } from 'src/modules/entities/user/user.service';
import { FeatureAnalyticsMiddlewareService } from 'src/modules/telegram-bot/middlewares/feature-analytics-middleware.service';
import { MessageAgeMiddlewareService } from 'src/modules/telegram-bot/middlewares/message-age-middleware.service';
import { AuthApiService } from 'src/modules/admin-api/auth-api/auth-api.service';

@Injectable()
export class AdminCommandService {
  constructor(
    private readonly templatesService: TemplatesService,
    private readonly dbMiddlewareService: DbMiddlewareService,
    private readonly preliminaryDataSaveService: PreliminaryDataSaveService,
    private readonly privateChatsOnlyMiddlewareService: PrivateChatsOnlyMiddlewareService,
    private readonly userService: UserService,
    private readonly featureAnalyticsService: FeatureAnalyticsMiddlewareService,
    private readonly messageAgeMiddlewareService: MessageAgeMiddlewareService,
    private readonly authService: AuthApiService,
  ) {}

  private async processMessage(ctx: Context): Promise<void> {
    const client = getContextConnectionOrFail(ctx);
    const message = getContextMessageOrFail(ctx);

    const user = await this.userService.getById(
      client,
      getMessageFromOrFail(message).id.toString(),
    );

    let accessCode: string;

    try {
      accessCode = await this.authService.setAdminAccessCode(user.id);
    } catch (error) {
      const text = await this.templatesService.renderTemplate(
        join(__dirname, 'templates', 'unauthorized.mustache'),
        {},
      );

      await ctx.telegram.sendMessage(message.chat.id, text, {
        reply_to_message_id: message.message_id,
        parse_mode: 'MarkdownV2',
      });

      return;
    }

    const text = await this.templatesService.renderTemplate(
      join(__dirname, 'templates', 'your-credentials.mustache'),
      { accessCode },
    );

    await ctx.telegram.sendMessage(message.chat.id, text, {
      reply_to_message_id: message.message_id,
      parse_mode: 'MarkdownV2',
    });
  }

  getMessageMiddleware(): Middleware {
    return composeMiddlewares([
      this.dbMiddlewareService.getMiddleware(),
      this.preliminaryDataSaveService.getMiddleware(),
      this.featureAnalyticsService.getMiddleware(
        'admin-command/message-command',
      ),
      this.messageAgeMiddlewareService.getMiddleware(),
      this.privateChatsOnlyMiddlewareService.getMiddleware(),
      this.processMessage.bind(this),
    ]);
  }
}
