import { join } from 'path';

import { Injectable } from '@nestjs/common';

import { Context, Middleware } from 'src/common/types/bot';
import {
  getContextConnectionOrFail,
  getMessageFromOrFail,
  getContextMessageOrFail,
} from 'src/common/utils/telegram-context';
import { composeMiddlewares } from 'src/common/utils/telegram-middlewares';
import { TemplatesService } from 'src/modules/telegram-bot/templates/templates.service';
import { DbMiddlewareService } from 'src/modules/telegram-bot/middlewares/db-middleware.service';
import { PreliminaryDataSaveService } from 'src/modules/telegram-bot/middlewares/preliminary-data-save-middleware.service';
import { PrivateChatsOnlyMiddlewareService } from 'src/modules/telegram-bot/middlewares/private-chats-only-middleware.service';
import { FeatureAnalyticsMiddlewareService } from 'src/modules/telegram-bot/middlewares/feature-analytics-middleware.service';
import { MessageAgeMiddlewareService } from 'src/modules/telegram-bot/middlewares/message-age-middleware.service';
import { AdminSiteAccessService } from 'src/modules/entities/admin-site-access/admin-site-access.service';
import { RandomService } from 'src/modules/random/random.service';
import { AdminSiteAuthService } from 'src/modules/admin-site-auth/admin-site-auth.service';

@Injectable()
export class AccessAdminSiteCommandService {
  constructor(
    private readonly templatesService: TemplatesService,
    private readonly dbMiddlewareService: DbMiddlewareService,
    private readonly preliminaryDataSaveService: PreliminaryDataSaveService,
    private readonly privateChatsOnlyMiddlewareService: PrivateChatsOnlyMiddlewareService,
    private readonly featureAnalyticsService: FeatureAnalyticsMiddlewareService,
    private readonly messageAgeMiddlewareService: MessageAgeMiddlewareService,
    private readonly adminSiteAccessService: AdminSiteAccessService,
    private readonly randomService: RandomService,
    private readonly adminSiteAuthService: AdminSiteAuthService,
  ) {}

  private async processMessage(ctx: Context): Promise<void> {
    const client = getContextConnectionOrFail(ctx);
    const message = getContextMessageOrFail(ctx);
    const from = getMessageFromOrFail(message);

    const adminAccess = await this.adminSiteAccessService.findByUserId(
      client,
      from.id.toString(),
    );

    if (!adminAccess) {
      return;
    }

    const code = this.randomService.getString(16);

    this.adminSiteAuthService.setAccessCode(from.id.toString(), code);

    const text = await this.templatesService.renderTemplate(
      join(__dirname, 'templates', 'your-code.mustache'),
      { code },
    );

    await ctx.tg.sendMessage(message.chat.id, text, {
      parse_mode: 'MarkdownV2',
    });
  }

  getMessageMiddleware(): Middleware {
    return composeMiddlewares([
      this.dbMiddlewareService.getMiddleware(),
      this.preliminaryDataSaveService.getMiddleware(),
      this.featureAnalyticsService.getMiddleware(
        'access-admin-site/message-command',
      ),
      this.messageAgeMiddlewareService.getMiddleware(),
      this.privateChatsOnlyMiddlewareService.getMiddleware(),
      this.processMessage.bind(this),
    ]);
  }
}
