import { join } from 'path';

import { Injectable } from '@nestjs/common';

import { Context, Middleware } from 'src/common/types/bot';
import { getContextChat } from 'src/common/utils/context';
import { composeMiddlewares } from 'src/common/utils/middlewares';
import { TemplatesService } from 'src/modules/templates/templates.service';
import { DbMiddlewareService } from 'src/modules/middlewares/db-middleware.service';
import { PreliminaryDataSaveService } from 'src/modules/middlewares/preliminary-data-save.service';
import { FeatureAnalyticsMiddlewareService } from 'src/modules/middlewares/feature-analytics.service';
import { MessageAgeMiddlewareService } from 'src/modules/middlewares/message-age-middleware.service';

@Injectable()
export class HelpCommandService {
  constructor(
    private templatesService: TemplatesService,
    private dbMiddlewareService: DbMiddlewareService,
    private preliminaryDataSaveService: PreliminaryDataSaveService,
    private featureAnalyticsMiddlewareService: FeatureAnalyticsMiddlewareService,
    private messageAgeMiddlewareService: MessageAgeMiddlewareService,
  ) {}

  private async processCommand(ctx: Context): Promise<void> {
    const messageText = await this.templatesService.renderTemplate(
      join(__dirname, 'templates', 'help-message.mustache'),
      {},
    );

    ctx.tg.sendMessage(getContextChat(ctx).id, messageText, {
      parse_mode: 'MarkdownV2',
      disable_web_page_preview: true,
    });
  }

  getMessageMiddleware(): Middleware {
    return composeMiddlewares([
      this.dbMiddlewareService.getMiddleware(),
      this.preliminaryDataSaveService.getMiddleware(),
      this.featureAnalyticsMiddlewareService.getMiddleware('help-command'),
      this.messageAgeMiddlewareService.getMiddleware(),
      this.processCommand.bind(this),
    ]);
  }
}
