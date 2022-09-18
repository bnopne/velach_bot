import { join } from 'path';

import { Injectable } from '@nestjs/common';

import { Context, Middleware } from 'src/common/types/bot';
import {
  getCallbackQueryDataOrFail,
  getCallbackQueryMessageOrFail,
  getContextConnectionOrFail,
  getContextCallbackQueryOrFail,
  getContextMessageOrFail,
} from 'src/common/utils/telegram-context';
import { BikecheckService } from 'src/modules/entities/bikecheck/bikecheck.service';
import { BikecheckVoteService } from 'src/modules/entities/bikecheck-vote/bikecheck-vote.service';
import { UserService } from 'src/modules/entities/user/user.service';
import { TemplatesService } from 'src/modules/telegram-bot/templates/templates.service';
import { DbMiddlewareService } from 'src/modules/telegram-bot/middlewares/db-middleware.service';
import { PreliminaryDataSaveService } from 'src/modules/telegram-bot/middlewares/preliminary-data-save-middleware.service';
import { composeMiddlewares } from 'src/common/utils/telegram-middlewares';
import { FeatureAnalyticsMiddlewareService } from 'src/modules/telegram-bot/middlewares/feature-analytics-middleware.service';
import { MessageAgeMiddlewareService } from 'src/modules/telegram-bot/middlewares/message-age-middleware.service';

import { getTopKeyboard } from './keyboards';
import { parseCallbackData } from 'src/common/utils/telegram-keyboard';

import { ITopCallbackQueryData } from './types';

@Injectable()
export class TopCommandService {
  constructor(
    private bikecheckService: BikecheckService,
    private bikecheckVoteService: BikecheckVoteService,
    private templatesService: TemplatesService,
    private userService: UserService,
    private dbMiddlewareService: DbMiddlewareService,
    private preliminaryDataSaveService: PreliminaryDataSaveService,
    private featureAnalyticsMiddlewareService: FeatureAnalyticsMiddlewareService,
    private messageAgeMiddlewareService: MessageAgeMiddlewareService,
  ) {}

  private async processMessage(ctx: Context): Promise<void> {
    const client = getContextConnectionOrFail(ctx);
    const message = getContextMessageOrFail(ctx);

    const topData = await this.bikecheckVoteService.getBikechecksTopData(
      client,
    );

    if (!topData.length) {
      const text = await this.templatesService.renderTemplate(
        join(__dirname, 'templates', 'no-top.mustache'),
        {},
      );

      await ctx.tg.sendMessage(message.chat.id, text, {
        reply_to_message_id: message.message_id,
        parse_mode: 'MarkdownV2',
      });

      return;
    }

    const bikecheck = await this.bikecheckService.getById(
      client,
      topData[0].bikecheckId,
    );
    const user = await this.userService.getById(client, bikecheck.userId);

    const caption = await this.templatesService.renderTemplate(
      join(__dirname, 'templates', 'top-caption.mustache'),
      { user, position: 1, onSale: bikecheck.onSale, likes: topData[0].likes },
    );

    await ctx.tg.sendPhoto(message.chat.id, bikecheck.telegramImageId, {
      caption,
      reply_markup: getTopKeyboard(1, topData.length),
      parse_mode: 'MarkdownV2',
    });
  }

  private async processCallbackQuery(ctx: Context): Promise<void> {
    const client = getContextConnectionOrFail(ctx);
    const callbackQuery = getContextCallbackQueryOrFail(ctx);
    const message = getCallbackQueryMessageOrFail(callbackQuery);
    const data = parseCallbackData<ITopCallbackQueryData>(
      getCallbackQueryDataOrFail(callbackQuery),
    );

    if (!data.position) {
      await ctx.tg.answerCbQuery(callbackQuery.id);
      return;
    }

    const topData = await this.bikecheckVoteService.getBikechecksTopData(
      client,
    );

    if (!topData.length || data.position > topData.length) {
      await ctx.tg.answerCbQuery(callbackQuery.id);
      return;
    }

    const bikecheck = await this.bikecheckService.getById(
      client,
      topData[data.position - 1].bikecheckId,
    );
    const user = await this.userService.getById(client, bikecheck.userId);

    const caption = await this.templatesService.renderTemplate(
      join(__dirname, 'templates', 'top-caption.mustache'),
      {
        user,
        position: data.position,
        onSale: bikecheck.onSale,
        likes: topData[0].likes,
      },
    );

    await ctx.tg.editMessageMedia(
      message.chat.id,
      message.message_id,
      undefined,
      {
        type: 'photo',
        media: bikecheck.telegramImageId,
        caption,
        parse_mode: 'MarkdownV2',
      },
      {
        reply_markup: getTopKeyboard(data.position, topData.length),
      },
    );
    await ctx.tg.answerCbQuery(callbackQuery.id);
  }

  getCallbackQueryMiddleware(): Middleware {
    return composeMiddlewares([
      this.dbMiddlewareService.getMiddleware(),
      this.preliminaryDataSaveService.getMiddleware(),
      this.featureAnalyticsMiddlewareService.getMiddleware(
        'top-command/callback-query/show-top',
      ),
      this.processCallbackQuery.bind(this),
    ]);
  }

  getMessageMiddleware(): Middleware {
    return composeMiddlewares([
      this.dbMiddlewareService.getMiddleware(),
      this.preliminaryDataSaveService.getMiddleware(),
      this.featureAnalyticsMiddlewareService.getMiddleware(
        'top-command/message-command',
      ),
      this.messageAgeMiddlewareService.getMiddleware(),
      this.processMessage.bind(this),
    ]);
  }
}
