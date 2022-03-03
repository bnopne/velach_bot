import { join } from 'path';

import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';

import { TemplatesService } from 'src/modules/templates/templates.service';
import { DbMiddlewareService } from 'src/modules/middlewares/db-middleware.service';
import { PreliminaryDataSaveService } from 'src/modules/middlewares/preliminary-data-save.service';
import { PrivateChatsOnlyMiddlewareService } from 'src/modules/middlewares/private-chats-only.service';
import { composeMiddlewares } from 'src/common/utils/middlewares';
import {
  getCallbackQueryDataOrFail,
  getCallbackQueryMessageOrFail,
  getContextConnectionOrFail,
  getContextCallbackQueryOrFail,
  getMessageFromOrFail,
  getContextMessageOrFail,
} from 'src/common/utils/context';
import { Context, Middleware } from 'src/common/types/bot';
import { UserService } from 'src/modules/entities/user/user.service';
import { ChatService } from 'src/modules/entities/chat/chat.service';
import { BikecheckService } from 'src/modules/entities/bikecheck/bikecheck.service';
import { BikecheckVoteService } from 'src/modules/entities/bikecheck-vote/bikecheck-vote.service';
import { parseCallbackData } from 'src/common/utils/keyboard';
import { IBikecheckCommandData } from 'src/modules/commands/types';
import { FeatureAnalyticsMiddlewareService } from 'src/modules/middlewares/feature-analytics.service';
import { MessageAgeMiddlewareService } from 'src/modules/middlewares/message-age-middleware.service';

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
    private chatService: ChatService,
    private bikecheckService: BikecheckService,
    private bikecheckVoteService: BikecheckVoteService,
    private featureAnalyticsService: FeatureAnalyticsMiddlewareService,
    private messageAgeMiddlewareService: MessageAgeMiddlewareService,
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

      await ctx.tg.sendMessage(message.chat.id, text, {
        parse_mode: 'MarkdownV2',
        reply_to_message_id: message.message_id,
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

    await ctx.tg.sendPhoto(message.chat.id, liked.bikecheck.telegramImageId, {
      caption,
      parse_mode: 'MarkdownV2',
      reply_to_message_id: message.message_id,
      reply_markup: getMyLikesKeyboard(liked.bikecheck),
    });
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

      await ctx.tg.editMessageMedia(
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

    await ctx.tg.editMessageMedia(
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
