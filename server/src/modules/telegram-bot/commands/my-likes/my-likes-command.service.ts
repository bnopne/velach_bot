import { join } from 'path';

import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';

import { TemplatesService } from 'src/modules/telegram-bot/templates/templates.service';
import { DbMiddlewareService } from 'src/modules/telegram-bot/middlewares/db-middleware.service';
import { PreliminaryDataSaveService } from 'src/modules/telegram-bot/middlewares/preliminary-data-save-middleware.service';
import { PrivateChatsOnlyMiddlewareService } from 'src/modules/telegram-bot/middlewares/private-chats-only-middleware.service';
import { composeMiddlewares } from 'src/common/utils/telegram-middlewares';
import {
  getCallbackQueryDataOrFail,
  getCallbackQueryMessageOrFail,
  getContextConnectionOrFail,
  getContextCallbackQueryOrFail,
  getMessageFromOrFail,
  getContextMessageOrFail,
} from 'src/common/utils/telegram-context';
import { Context, Middleware } from 'src/common/types/bot';
import { UserService } from 'src/modules/entities/user/user.service';
import { BikecheckService } from 'src/modules/entities/bikecheck/bikecheck.service';
import { parseCallbackData } from 'src/common/utils/telegram-keyboard';
import { IBikecheckCommandData } from 'src/modules/telegram-bot/commands/types';
import { FeatureAnalyticsMiddlewareService } from 'src/modules/telegram-bot/middlewares/feature-analytics-middleware.service';

import { getMyLikesKeyboard } from './keyboards';
import { CALLBACK_QUERY_COMMANDS } from 'src/common/constants';
import { getNextIndex, getPreviousIndex } from 'src/common/utils/misc';

@Injectable()
export class MyLikesCommandService {
  constructor(
    private templatesService: TemplatesService,
    private dbMiddlewareService: DbMiddlewareService,
    private preliminaryDataSaveService: PreliminaryDataSaveService,
    private privateChatsOnlyMiddlewareService: PrivateChatsOnlyMiddlewareService,
    private userService: UserService,
    private bikecheckService: BikecheckService,
    private featureAnalyticsService: FeatureAnalyticsMiddlewareService,
  ) {}

  private async processMessage(ctx: Context): Promise<void> {
    const client = getContextConnectionOrFail(ctx);
    const message = getContextMessageOrFail(ctx);

    const user = await this.userService.getById(
      client,
      getMessageFromOrFail(message).id.toString(),
    );

    const likedBikechecks = await this.bikecheckService.findLiked(
      client,
      user.id,
    );

    if (likedBikechecks.length === 0) {
      const text = await this.templatesService.renderTemplate(
        join(__dirname, 'templates', 'no-bikechecks.mustache'),
        {},
      );

      await ctx.telegram.sendMessage(message.chat.id, text, {
        parse_mode: 'MarkdownV2',
        reply_parameters: {
          message_id: message.message_id,
        },
        message_thread_id: message.is_topic_message
          ? message.message_thread_id
          : undefined,
      });

      return;
    }

    const liked = likedBikechecks[0];

    const caption = await this.templatesService.renderTemplate(
      join(__dirname, 'templates', 'caption.mustache'),
      {
        likeDate: format(liked.likeDate, 'dd\\.MM\\.yyyy'),
      },
    );

    await ctx.telegram.sendPhoto(
      message.chat.id,
      liked.bikecheck.telegramImageId,
      {
        caption,
        parse_mode: 'MarkdownV2',
        reply_parameters: {
          message_id: message.message_id,
        },
        reply_markup: getMyLikesKeyboard(liked.bikecheck),
        message_thread_id: message.is_topic_message
          ? message.message_thread_id
          : undefined,
      },
    );
  }

  private async switchLikedBikecheck(
    ctx: Context,
    direction: 'previous' | 'next',
  ): Promise<void> {
    const client = getContextConnectionOrFail(ctx);
    const callbackQuery = getContextCallbackQueryOrFail(ctx);
    const message = getCallbackQueryMessageOrFail(callbackQuery);
    const data = parseCallbackData<IBikecheckCommandData>(
      getCallbackQueryDataOrFail(callbackQuery),
    );

    const sourceBikecheck = await this.bikecheckService.getById(
      client,
      data.bikecheckId,
    );

    const likedBikechecks = await this.bikecheckService.findLiked(
      client,
      callbackQuery.from.id.toString(),
    );

    if (likedBikechecks.length === 0) {
      const caption = await this.templatesService.renderTemplate(
        join(__dirname, 'templates', 'no-bikechecks.mustache'),
        {},
      );

      await ctx.telegram.editMessageMedia(
        message.chat.id,
        message.message_id,
        undefined,
        {
          media:
            'https://cdn.pixabay.com/photo/2013/04/01/11/00/no-biking-98885__340.png',
          type: 'photo',
          caption,
          parse_mode: 'MarkdownV2',
        },
      );

      return;
    }

    let index = likedBikechecks.findIndex(
      (lb) => lb.bikecheck.id === sourceBikecheck.id,
    );

    if (index === -1) {
      index = 0;
    } else {
      index =
        direction === 'next'
          ? getNextIndex(index, likedBikechecks.length)
          : getPreviousIndex(index, likedBikechecks.length);
    }

    const caption = await this.templatesService.renderTemplate(
      join(__dirname, 'templates', 'caption.mustache'),
      {
        likeDate: format(likedBikechecks[index].likeDate, 'dd\\.MM\\.yyyy'),
      },
    );

    await ctx.telegram.editMessageMedia(
      message.chat.id,
      message.message_id,
      undefined,
      {
        type: 'photo',
        media: likedBikechecks[index].bikecheck.telegramImageId,
        caption,
        parse_mode: 'MarkdownV2',
      },
      {
        reply_markup: getMyLikesKeyboard(likedBikechecks[index].bikecheck),
      },
    );
  }

  getMessageMiddleware(): Middleware {
    return composeMiddlewares([
      this.dbMiddlewareService.getMiddleware(),
      this.preliminaryDataSaveService.getMiddleware(),
      this.privateChatsOnlyMiddlewareService.getMiddleware(),
      this.featureAnalyticsService.getMiddleware(
        'mylikes-command/message-command',
      ),
      this.processMessage.bind(this),
    ]);
  }

  getCallbackQueryMiddleware(command: string): Middleware {
    if (command === CALLBACK_QUERY_COMMANDS.SHOW_PREVIOUS_LIKED_BIKECHECK) {
      return composeMiddlewares([
        this.dbMiddlewareService.getMiddleware(),
        this.preliminaryDataSaveService.getMiddleware(),
        this.privateChatsOnlyMiddlewareService.getMiddleware(),
        this.featureAnalyticsService.getMiddleware(
          'mylikes-command/callback-query/show-previous',
        ),
        (ctx) => this.switchLikedBikecheck(ctx, 'previous'),
      ]);
    }

    if (command === CALLBACK_QUERY_COMMANDS.SHOW_NEXT_LIKED_BIKECHECK) {
      return composeMiddlewares([
        this.dbMiddlewareService.getMiddleware(),
        this.preliminaryDataSaveService.getMiddleware(),
        this.privateChatsOnlyMiddlewareService.getMiddleware(),
        this.featureAnalyticsService.getMiddleware(
          'mylikes-command/callback-query/show-next',
        ),
        (ctx) => this.switchLikedBikecheck(ctx, 'next'),
      ]);
    }

    throw new Error(
      `Tried to get middleware for unrecognized command ${command}`,
    );
  }
}
