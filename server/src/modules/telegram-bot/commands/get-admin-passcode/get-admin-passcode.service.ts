import { join } from 'node:path';

import { Injectable } from '@nestjs/common';

import { type Context, type TMiddleware } from 'src/common/types/bot';
import { TemplatesService } from 'src/modules/telegram-bot/templates/templates.service';
import { DbMiddlewareService } from 'src/modules/telegram-bot/middlewares/db-middleware.service';
import { PreliminaryDataSaveService } from 'src/modules/telegram-bot/middlewares/preliminary-data-save-middleware.service';
import { PrivateChatsOnlyMiddlewareService } from 'src/modules/telegram-bot/middlewares/private-chats-only-middleware.service';
import { FeatureAnalyticsMiddlewareService } from 'src/modules/telegram-bot/middlewares/feature-analytics-middleware.service';
import { composeMiddlewares } from 'src/common/utils/telegram-middlewares';
import { BotAdminsOnlyMiddlewareService } from 'src/modules/telegram-bot/middlewares/bot-admins-only-middleware.service';
import {
  getContextMessageOrFail,
  getMessageFromOrFail,
} from 'src/common/utils/telegram-context';
import { AdminPasscodeService } from 'src/modules/auth/admin-passcode.service';

@Injectable()
export class GetAdminPasscodeService {
  constructor(
    private readonly templatesService: TemplatesService,
    private readonly dbMiddlewareService: DbMiddlewareService,
    private readonly preliminaryDataSaveService: PreliminaryDataSaveService,
    private readonly privateChatsOnlyMiddlewareService: PrivateChatsOnlyMiddlewareService,
    private readonly featureAnalyticsService: FeatureAnalyticsMiddlewareService,
    private readonly botAdminsOnlyMiddlewareService: BotAdminsOnlyMiddlewareService,
    private readonly adminPasscodeService: AdminPasscodeService,
  ) {}

  private async processMessage(ctx: Context) {
    const message = getContextMessageOrFail(ctx);
    const from = getMessageFromOrFail(message);

    const passcode = await this.adminPasscodeService.createPasscode(
      from.id.toString(10),
    );

    const text = await this.templatesService.renderTemplate(
      join(__dirname, 'templates', 'your-passcode.mustache'),
      { passcode },
    );

    await ctx.telegram.sendMessage(message.chat.id, text, {
      parse_mode: 'MarkdownV2',
    });
  }

  getMessageMiddleware(): TMiddleware {
    return composeMiddlewares([
      this.dbMiddlewareService.getMiddleware(),
      this.preliminaryDataSaveService.getMiddleware(),
      this.privateChatsOnlyMiddlewareService.getMiddleware(),
      this.botAdminsOnlyMiddlewareService.getMiddleware(),
      this.featureAnalyticsService.getMiddleware(
        'getadminpasscode-command/message-command',
      ),
      this.processMessage.bind(this),
    ]);
  }
}
