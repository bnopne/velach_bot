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
import { parseCallbackData } from 'src/common/utils/telegram-keyboard';
import { composeMiddlewares } from 'src/common/utils/telegram-middlewares';
import { BikecheckService } from 'src/modules/entities/bikecheck/bikecheck.service';
import { UserService } from 'src/modules/entities/user/user.service';
import { DbMiddlewareService } from 'src/modules/telegram-bot/middlewares/db-middleware.service';
import { PreliminaryDataSaveService } from 'src/modules/telegram-bot/middlewares/preliminary-data-save-middleware.service';
import { TemplatesService } from 'src/modules/telegram-bot/templates/templates.service';
import { IBikecheckCommandData } from 'src/modules/telegram-bot/commands/types';
import { getNextIndex, getPreviousIndex } from 'src/common/utils/misc';
import { FeatureAnalyticsMiddlewareService } from 'src/modules/telegram-bot/middlewares/feature-analytics-middleware.service';
import { MessageAgeMiddlewareService } from 'src/modules/telegram-bot/middlewares/message-age-middleware.service';

import { getOnSaleKeyboard } from './keyboards';
import { CALLBACK_QUERY_COMMANDS } from 'src/common/constants';

@Injectable()
export class OnSaleCommandService {
  constructor(
    private bikecheckService: BikecheckService,
    private userService: UserService,
    private templatesService: TemplatesService,
    private dbMiddlewareService: DbMiddlewareService,
    private preliminaryDataSaveService: PreliminaryDataSaveService,
    private featureAnalyticsMiddlewareService: FeatureAnalyticsMiddlewareService,
    private messageAgeMiddlewareService: MessageAgeMiddlewareService,
  ) {}

  private async processMessage(ctx: Context): Promise<void> {
    const client = getContextConnectionOrFail(ctx);
    const message = getContextMessageOrFail(ctx);

    const bikechecks = await this.bikecheckService.findOnSale(client);

    if (!bikechecks.length) {
      const text = await this.templatesService.renderTemplate(
        join(__dirname, 'templates', 'no-bikechecks.mustache'),
        {},
      );

      await ctx.tg.sendMessage(message.chat.id, text, {
        reply_to_message_id: message.message_id,
        parse_mode: 'MarkdownV2',
      });
      return;
    }

    const bikecheck = bikechecks[0];
    const owner = await this.userService.getById(client, bikecheck.userId);

    const caption = await this.templatesService.renderTemplate(
      join(__dirname, 'templates', 'on-sale-caption.mustache'),
      { userId: owner.id },
    );

    await ctx.tg.sendPhoto(message.chat.id, bikecheck.telegramImageId, {
      caption,
      parse_mode: 'MarkdownV2',
      reply_to_message_id: message.message_id,
      reply_markup: getOnSaleKeyboard(bikecheck),
    });
  }

  private async switchOnSaleBikecheck(
    ctx: Context,
    direction: 'previous' | 'next',
  ): Promise<void> {
    const client = getContextConnectionOrFail(ctx);
    const callbackQuery = getContextCallbackQueryOrFail(ctx);
    const message = getCallbackQueryMessageOrFail(callbackQuery);
    const data = parseCallbackData<IBikecheckCommandData>(
      getCallbackQueryDataOrFail(callbackQuery),
    );

    const bikechecks = await this.bikecheckService.findOnSale(client);

    if (!bikechecks.length) {
      await ctx.tg.answerCbQuery(callbackQuery.id);
      return;
    }

    const currentBikecheck = await this.bikecheckService.getById(
      client,
      data.bikecheckId,
    );

    let index = bikechecks.findIndex((b) => b.id === currentBikecheck.id);
    const oldIndex = index;

    if (index === -1) {
      index = 0;
    } else {
      index =
        direction === 'previous'
          ? getPreviousIndex(index, bikechecks.length)
          : getNextIndex(index, bikechecks.length);
    }

    if (index === oldIndex) {
      await ctx.tg.answerCbQuery(callbackQuery.id);
      return;
    }

    const nextBikecheck = bikechecks[index];
    const owner = await this.userService.getById(client, nextBikecheck.userId);

    const caption = await this.templatesService.renderTemplate(
      join(__dirname, 'templates', 'on-sale-caption.mustache'),
      { userId: owner.id },
    );

    ctx.tg.editMessageMedia(
      message.chat.id,
      message.message_id,
      undefined,
      {
        type: 'photo',
        caption,
        parse_mode: 'MarkdownV2',
        media: nextBikecheck.telegramImageId,
      },
      {
        reply_markup: getOnSaleKeyboard(nextBikecheck),
      },
    );

    await ctx.tg.answerCbQuery(callbackQuery.id);
  }

  getCallbackQueryMiddleware(command: string): Middleware {
    switch (command) {
      case CALLBACK_QUERY_COMMANDS.SHOW_PREVIOUS_ON_SALE_BIKECHECK:
        return composeMiddlewares([
          this.dbMiddlewareService.getMiddleware(),
          this.preliminaryDataSaveService.getMiddleware(),
          this.featureAnalyticsMiddlewareService.getMiddleware(
            'onsale-command/callback-query/show-previous',
          ),
          (ctx) => this.switchOnSaleBikecheck(ctx, 'previous'),
        ]);
      case CALLBACK_QUERY_COMMANDS.SHOW_NEXT_ON_SALE_BIKECHECK:
        return composeMiddlewares([
          this.dbMiddlewareService.getMiddleware(),
          this.preliminaryDataSaveService.getMiddleware(),
          this.featureAnalyticsMiddlewareService.getMiddleware(
            'onsale-command/callback-query/show-next',
          ),
          (ctx) => this.switchOnSaleBikecheck(ctx, 'next'),
        ]);
      default:
        throw new Error(
          `Tried to get middleware for unrecognized command ${command}`,
        );
    }
  }

  getMessageMiddleware(): Middleware {
    return composeMiddlewares([
      this.dbMiddlewareService.getMiddleware(),
      this.preliminaryDataSaveService.getMiddleware(),
      this.featureAnalyticsMiddlewareService.getMiddleware(
        'onsale command/message-command',
      ),
      this.messageAgeMiddlewareService.getMiddleware(),
      this.processMessage.bind(this),
    ]);
  }
}
