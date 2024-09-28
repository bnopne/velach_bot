import { join } from 'node:path';

import { Injectable } from '@nestjs/common';

import { type Context, type TMiddleware } from 'src/common/types/bot';
import { ConfigurationService } from 'src/modules/configuration/configuration.service';
import { TemplatesService } from 'src/modules/telegram-bot/templates/templates.service';
import { DbMiddlewareService } from 'src/modules/telegram-bot/middlewares/db-middleware.service';
import { PreliminaryDataSaveService } from 'src/modules/telegram-bot/middlewares/preliminary-data-save-middleware.service';
import { PrivateChatsOnlyMiddlewareService } from 'src/modules/telegram-bot/middlewares/private-chats-only-middleware.service';
import { FeatureAnalyticsMiddlewareService } from 'src/modules/telegram-bot/middlewares/feature-analytics-middleware.service';
import { composeMiddlewares } from 'src/common/utils/telegram-middlewares';
import { BotAdminsOnlyMiddlewareService } from 'src/modules/telegram-bot/middlewares/bot-admins-only-middleware.service';
import { InMemoryStorageService } from 'src/modules/in-memory-storage/in-memory-storage.service';
import { RandomService } from 'src/modules/random/random.service';
import {
  getContextMessageOrFail,
  getMessageFromOrFail,
} from 'src/common/utils/telegram-context';

@Injectable()
export class GetAdminPasscodeService {
  constructor(
    private readonly configurationService: ConfigurationService,
    private readonly templatesService: TemplatesService,
    private readonly dbMiddlewareService: DbMiddlewareService,
    private readonly preliminaryDataSaveService: PreliminaryDataSaveService,
    private readonly privateChatsOnlyMiddlewareService: PrivateChatsOnlyMiddlewareService,
    private readonly featureAnalyticsService: FeatureAnalyticsMiddlewareService,
    private readonly botAdminsOnlyMiddlewareService: BotAdminsOnlyMiddlewareService,
    private readonly inMemoryStorageService: InMemoryStorageService,
    private readonly randomService: RandomService,
  ) {}

  private async processMessage(ctx: Context) {
    const message = getContextMessageOrFail(ctx);
    const from = getMessageFromOrFail(message);

    const passcode = this.randomService.getString(
      this.configurationService.adminPasscodeLength,
    );

    const ownerId = from.id.toString(10);

    this.inMemoryStorageService.set(`admin-passcode/${ownerId}`, passcode, {
      TTL: this.configurationService.adminPasscodeTTL * 1000,
      ownerId,
    });

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
