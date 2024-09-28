import { Injectable } from '@nestjs/common';

import { type Context, type TMiddleware } from 'src/common/types/bot';
import { TemplatesService } from 'src/modules/telegram-bot/templates/templates.service';
import { DbMiddlewareService } from 'src/modules/telegram-bot/middlewares/db-middleware.service';
import { PreliminaryDataSaveService } from 'src/modules/telegram-bot/middlewares/preliminary-data-save-middleware.service';
import { PrivateChatsOnlyMiddlewareService } from 'src/modules/telegram-bot/middlewares/private-chats-only-middleware.service';
import { UserService } from 'src/modules/entities/user/user.service';
import { FeatureAnalyticsMiddlewareService } from 'src/modules/telegram-bot/middlewares/feature-analytics-middleware.service';
import { composeMiddlewares } from 'src/common/utils/telegram-middlewares';

@Injectable()
export class GetAdminPasscodeService {
  constructor(
    private templatesService: TemplatesService,
    private dbMiddlewareService: DbMiddlewareService,
    private preliminaryDataSaveService: PreliminaryDataSaveService,
    private privateChatsOnlyMiddlewareService: PrivateChatsOnlyMiddlewareService,
    private userService: UserService,
    private featureAnalyticsService: FeatureAnalyticsMiddlewareService,
  ) {}

  private async processMessage(ctx: Context) {}

  getMessageMiddleware(): TMiddleware {
    return composeMiddlewares([
      this.dbMiddlewareService.getMiddleware(),
      this.preliminaryDataSaveService.getMiddleware(),
      this.privateChatsOnlyMiddlewareService.getMiddleware(),
      this.featureAnalyticsService.getMiddleware(
        'getadminpasscode-command/message-command',
      ),
      this.processMessage.bind(this),
    ]);
  }
}
