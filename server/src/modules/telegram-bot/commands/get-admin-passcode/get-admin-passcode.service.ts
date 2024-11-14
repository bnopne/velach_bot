import { join } from 'node:path';

import { Injectable } from '@nestjs/common';

import { AdminsOnlyMiddlewareService } from 'src/modules/telegram-bot/middlewares/admins-only-middleware.service';
import { DbMiddlewareService } from 'src/modules/telegram-bot/middlewares/db-middleware.service';
import { PreliminaryDataSaveService } from 'src/modules/telegram-bot/middlewares/preliminary-data-save-middleware.service';
import { PrivateChatsOnlyMiddlewareService } from 'src/modules/telegram-bot/middlewares/private-chats-only-middleware.service';
import { FeatureAnalyticsMiddlewareService } from 'src/modules/telegram-bot/middlewares/feature-analytics-middleware.service';
import { MessageAgeMiddlewareService } from 'src/modules/telegram-bot/middlewares/message-age-middleware.service';
import { Context, type Middleware } from 'src/common/types/bot';
import {
  getContextConnectionOrFail,
  getContextMessageOrFail,
  getMessageFromOrFail,
} from 'src/common/utils/telegram-context';
import { TemplatesService } from 'src/modules/telegram-bot/templates/templates.service';
import { AdminPasscodeService } from 'src/modules/admin-passcode/admin-passcode.service';
import { composeMiddlewares } from 'src/common/utils/telegram-middlewares';

@Injectable()
export class GetAdminPasscodeService {
  constructor(
    private readonly templatesService: TemplatesService,
    private readonly adminPasscodeService: AdminPasscodeService,
    private readonly dbMiddlewareService: DbMiddlewareService,
    private readonly preliminaryDataSaveService: PreliminaryDataSaveService,
    private readonly privateChatsOnlyMiddlewareService: PrivateChatsOnlyMiddlewareService,
    private readonly featureAnalyticsMiddlewareService: FeatureAnalyticsMiddlewareService,
    private readonly messageAgeMiddlewareService: MessageAgeMiddlewareService,
    private readonly adminsOnlyMiddlewareService: AdminsOnlyMiddlewareService,
  ) {}

  private async processCommand(context: Context): Promise<void> {
    const client = getContextConnectionOrFail(context);
    const message = getContextMessageOrFail(context);
    const from = getMessageFromOrFail(message);

    const passcode = await this.adminPasscodeService.getPasscode(
      client,
      from.id.toString(10),
    );

    const text = await this.templatesService.renderTemplate(
      join(__dirname, 'templates', 'passcode.mustache'),
      { passcode },
    );

    await context.telegram.sendMessage(message.chat.id, text, {
      parse_mode: 'MarkdownV2',
    });
  }

  getMessageMiddleware(): Middleware {
    return composeMiddlewares([
      this.dbMiddlewareService.getMiddleware(),
      this.preliminaryDataSaveService.getMiddleware(),
      this.featureAnalyticsMiddlewareService.getMiddleware(
        'deleted-command/message-command',
      ),
      this.messageAgeMiddlewareService.getMiddleware(),
      this.privateChatsOnlyMiddlewareService.getMiddleware(),
      this.adminsOnlyMiddlewareService.getMiddleware(),
      this.processCommand.bind(this),
    ]);
  }
}
