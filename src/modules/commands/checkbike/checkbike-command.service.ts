import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { Context, Middleware } from 'src/common/types/bot';
import {
  getContextConnectionOrFail,
  getContextMessageOrFail,
  getMessageReplyTo,
  getMessageBiggestPhoto,
  getMessageFromOrFail,
} from 'src/common/utils/context';
import { composeMiddlewares } from 'src/common/utils/middlewares';
import { BikecheckService } from 'src/modules/entities/bikecheck/bikecheck.service';
import { UserService } from 'src/modules/entities/user/user.service';
import { DbMiddlewareService } from 'src/modules/middlewares/db-middleware.service';
import { PreliminaryDataSaveService } from 'src/modules/middlewares/preliminary-data-save.service';
import { TemplatesService } from 'src/modules/templates/templates.service';
import { FeatureAnalyticsMiddlewareService } from 'src/modules/middlewares/feature-analytics.service';
import { MessageAgeMiddlewareService } from 'src/modules/middlewares/message-age-middleware.service';

@Injectable()
export class CheckbikeCommandService {
  constructor(
    private templatesService: TemplatesService,
    private dbMiddlewareService: DbMiddlewareService,
    private preliminaryDataSaveService: PreliminaryDataSaveService,
    private userService: UserService,
    private bikecheckService: BikecheckService,
    private featureAnalyticsService: FeatureAnalyticsMiddlewareService,
    private messageAgeMiddlewareService: MessageAgeMiddlewareService,
  ) {}

  private async processCommand(ctx: Context): Promise<void> {
    const client = getContextConnectionOrFail(ctx);
    const message = getContextMessageOrFail(ctx);
    const replyToMessage = getMessageReplyTo(message);

    if (!replyToMessage) {
      const text = await this.templatesService.renderTemplate(
        join(__dirname, 'templates', 'no-reply.mustache'),
        {},
      );

      await ctx.tg.sendMessage(message.chat.id, text, {
        reply_to_message_id: message.message_id,
        parse_mode: 'MarkdownV2',
      });

      return;
    }

    if (replyToMessage.from?.id !== message.from?.id) {
      const text = await this.templatesService.renderTemplate(
        join(__dirname, 'templates', 'not-your-message.mustache'),
        {},
      );

      await ctx.tg.sendMessage(message.chat.id, text, {
        reply_to_message_id: message.message_id,
        parse_mode: 'MarkdownV2',
      });

      return;
    }

    const photo = getMessageBiggestPhoto(replyToMessage);

    if (!photo) {
      const text = await this.templatesService.renderTemplate(
        join(__dirname, 'templates', 'no-photo.mustache'),
        {},
      );

      await ctx.tg.sendMessage(message.chat.id, text, {
        reply_to_message_id: message.message_id,
        parse_mode: 'MarkdownV2',
      });

      return;
    }

    const user = await this.userService.getById(
      client,
      getMessageFromOrFail(message).id.toString(),
    );

    await this.bikecheckService.createActive(client, user.id, photo.file_id);

    const text = await this.templatesService.renderTemplate(
      join(__dirname, 'templates', 'done.mustache'),
      {},
    );

    await ctx.tg.sendMessage(message.chat.id, text, {
      reply_to_message_id: message.message_id,
      parse_mode: 'MarkdownV2',
    });
  }

  getMessageMiddleware(): Middleware {
    return composeMiddlewares([
      this.dbMiddlewareService.getMiddleware(),
      this.preliminaryDataSaveService.getMiddleware(),
      this.featureAnalyticsService.getMiddleware('checkbike command'),
      this.messageAgeMiddlewareService.getMiddleware(),
      this.processCommand.bind(this),
    ]);
  }
}
