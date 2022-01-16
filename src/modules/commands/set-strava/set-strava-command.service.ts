import { join } from 'path';

import { Injectable } from '@nestjs/common';

import { Context, Middleware } from 'src/common/types/bot';
import {
  getConnectionFromContext,
  getMessageFrom,
  getMessageFromContext,
  getMessageReplyTo,
  getMessageText,
} from 'src/common/utils/context';
import { composeMiddlewares } from 'src/common/utils/middlewares';
import { UserService } from 'src/modules/entities/user/user.service';
import { DbMiddlewareService } from 'src/modules/middlewares/db-middleware.service';
import { PreliminaryDataSaveService } from 'src/modules/middlewares/preliminary-data-save.service';
import { PrivateChatsOnlyMiddlewareService } from 'src/modules/middlewares/private-chats-only.service';
import { TemplatesService } from 'src/modules/templates/templates.service';
import { FeatureAnalyticsMiddlewareService } from 'src/modules/middlewares/feature-analytics.service';

const stravaLinkRegexp = /^(https:\/\/)?(www.)?strava.com\/athletes\/\d+$/;

@Injectable()
export class SetStravaCommandService {
  constructor(
    private userService: UserService,
    private dbMiddlewareService: DbMiddlewareService,
    private preliminaryDataSaveService: PreliminaryDataSaveService,
    private privateChatsOnlyMiddlewareService: PrivateChatsOnlyMiddlewareService,
    private templatesService: TemplatesService,
    private featureAnalyticsMiddlewareService: FeatureAnalyticsMiddlewareService,
  ) {}

  private async processCommand(ctx: Context): Promise<void> {
    const client = getConnectionFromContext(ctx);
    const message = getMessageFromContext(ctx);
    const replyTo = getMessageReplyTo(message);

    if (!replyTo) {
      const text = await this.templatesService.renderTemplate(
        join(__dirname, 'templates', 'no-reply-to.mustache'),
        {},
      );

      await ctx.tg.sendMessage(message.chat.id, text, {
        reply_to_message_id: message.message_id,
        parse_mode: 'MarkdownV2',
      });
      return;
    }

    let link = getMessageText(replyTo) || '';

    if (!link.startsWith('https://')) {
      link = `https://${link}`;
    }

    if (!stravaLinkRegexp.test(link)) {
      const text = await this.templatesService.renderTemplate(
        join(__dirname, 'templates', 'invalid-link.mustache'),
        {},
      );

      await ctx.tg.sendMessage(message.chat.id, text, {
        reply_to_message_id: message.message_id,
        parse_mode: 'MarkdownV2',
      });
      return;
    }

    const messageSender = getMessageFrom(message);
    const replyToSender = getMessageFrom(replyTo);

    if (messageSender.id !== replyToSender.id) {
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

    const user = await this.userService.getById(
      client,
      replyToSender.id.toString(),
    );

    user.stravaLink = link;

    await this.userService.updateUser(client, user);

    const text = await this.templatesService.renderTemplate(
      join(__dirname, 'templates', 'done.mustache'),
      {},
    );

    await ctx.tg.sendMessage(message.chat.id, text, {
      reply_to_message_id: message.message_id,
      parse_mode: 'MarkdownV2',
    });
  }

  getMiddleware(): Middleware {
    return composeMiddlewares([
      this.dbMiddlewareService.getMiddleware(),
      this.preliminaryDataSaveService.getMiddleware(),
      this.privateChatsOnlyMiddlewareService.getMiddleware(),
      this.featureAnalyticsMiddlewareService.getMiddleware(
        'setstrava-command/message-command',
      ),
      this.processCommand.bind(this),
    ]);
  }
}
