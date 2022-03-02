import { join } from 'path';

import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import { TemplatesService } from 'src/modules/templates/templates.service';
import { DbMiddlewareService } from 'src/modules/middlewares/db-middleware.service';
import { PreliminaryDataSaveService } from 'src/modules/middlewares/preliminary-data-save.service';
import { PrivateChatsOnlyMiddlewareService } from 'src/modules/middlewares/private-chats-only.service';
import { composeMiddlewares } from 'src/common/utils/middlewares';
import {
  getCallbackQueryData,
  getCallbackQueryMessage,
  getConnectionFromContext,
  getContextCallbackQuery,
  getContextInlineQuery,
  getMessageChat,
  getMessageFrom,
  getMessageFromContext,
  getMessageReplyTo,
} from 'src/common/utils/context';
import { getNextIndex, getPreviousIndex } from 'src/common/utils/misc';
import { Context, Middleware } from 'src/common/types/bot';
import { UserService } from 'src/modules/entities/user/user.service';
import { ChatService } from 'src/modules/entities/chat/chat.service';
import { Bikecheck } from 'src/modules/entities/bikecheck/bikecheck.entity';
import { BikecheckService } from 'src/modules/entities/bikecheck/bikecheck.service';
import { BikecheckVoteService } from 'src/modules/entities/bikecheck-vote/bikecheck-vote.service';
import { parseCallbackData } from 'src/common/utils/keyboard';
import { IBikecheckCommandData } from 'src/modules/commands/types';
import { FeatureAnalyticsMiddlewareService } from 'src/modules/middlewares/feature-analytics.service';
import { MessageAgeMiddlewareService } from 'src/modules/middlewares/message-age-middleware.service';

import {
  getPrivateBikecheckKeyboard,
  getPublicBikecheckKeyboard,
} from './keyboards';
import { InlineQueryResult } from 'typegram';
import { CALLBACK_QUERY_COMMANDS } from 'src/common/constants';

@Injectable()
export class BikecheckCommandService {
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

  private async getBikecheckStats(
    client: PoolClient,
    bikecheck: Bikecheck,
  ): Promise<{ likes: number; dislikes: number; rank: number | null }> {
    const likes = await this.bikecheckVoteService.getBikecheckLikesCount(
      client,
      bikecheck.id,
    );

    const dislikes = await this.bikecheckVoteService.getBikecheckDislikesCount(
      client,
      bikecheck.id,
    );

    const rank = await this.bikecheckVoteService.getBikecheckRank(
      client,
      bikecheck.id,
    );

    return { likes, dislikes, rank };
  }

  private async editBikecheckMessage(
    ctx: Context,
    bikecheck: Bikecheck,
    activeBikechecks: Bikecheck[],
  ): Promise<void> {
    const client = getConnectionFromContext(ctx);
    const callbackQuery = getContextCallbackQuery(ctx);

    const { likes, dislikes, rank } = await this.getBikecheckStats(
      client,
      bikecheck,
    );

    const user = await this.userService.getById(client, bikecheck.userId);

    const bikecheckIndex = activeBikechecks.findIndex(
      (b) => b.id === bikecheck.id,
    );

    const caption = await this.templatesService.renderTemplate(
      join(__dirname, 'templates', 'bikecheck-caption.mustache'),
      {
        rank,
        totalBikechecks:
          activeBikechecks.length > 1 ? activeBikechecks.length : null,
        bikecheckOrder: bikecheckIndex + 1,
        likes,
        dislikes,
        stravaLink: user.stravaLink,
        onSale: bikecheck.onSale,
      },
    );

    if (callbackQuery.message) {
      await ctx.tg.editMessageMedia(
        callbackQuery.message.chat.id,
        callbackQuery.message.message_id,
        undefined,
        {
          type: 'photo',
          media: bikecheck.telegramImageId,
          caption,
          parse_mode: 'MarkdownV2',
        },
        {
          reply_markup:
            callbackQuery.message.chat.type === 'private'
              ? getPrivateBikecheckKeyboard(bikecheck)
              : getPublicBikecheckKeyboard(bikecheck),
        },
      );
    }

    if (callbackQuery.inline_message_id) {
      await ctx.tg.editMessageMedia(
        undefined,
        undefined,
        callbackQuery.inline_message_id,
        {
          type: 'photo',
          media: bikecheck.telegramImageId,
          caption,
          parse_mode: 'MarkdownV2',
        },
        {
          reply_markup: getPublicBikecheckKeyboard(bikecheck),
        },
      );
    }
  }

  private async processMessage(ctx: Context): Promise<void> {
    const client = getConnectionFromContext(ctx);
    const primaryMessage = getMessageFromContext(ctx);
    const replyTo = getMessageReplyTo(primaryMessage);

    const message = replyTo || primaryMessage;

    const chat = await this.chatService.getById(
      client,
      getMessageChat(message).id.toString(),
    );

    const user = await this.userService.getById(
      client,
      getMessageFrom(message).id.toString(),
    );

    const activeBikechecks = await this.bikecheckService.findActive(
      client,
      user.id,
    );

    if (!activeBikechecks.length) {
      const text = await this.templatesService.renderTemplate(
        join(__dirname, 'templates', 'no-bikechecks.mustache'),
        {},
      );

      await ctx.tg.sendMessage(primaryMessage.chat.id, text, {
        reply_to_message_id: primaryMessage.message_id,
        parse_mode: 'MarkdownV2',
      });

      return;
    }

    const bikecheck = activeBikechecks[0];

    const { likes, dislikes, rank } = await this.getBikecheckStats(
      client,
      bikecheck,
    );

    const bikechecksCount = await this.bikecheckService.getBikechecksCount(
      client,
      user.id,
    );

    const caption = await this.templatesService.renderTemplate(
      join(__dirname, 'templates', 'bikecheck-caption.mustache'),
      {
        rank,
        totalBikechecks: bikechecksCount > 1 ? bikechecksCount : null,
        bikecheckOrder: 1,
        likes,
        dislikes,
        stravaLink: user.stravaLink,
        onSale: bikecheck.onSale,
      },
    );

    if (chat.type === 'private') {
      await ctx.tg.sendPhoto(
        primaryMessage.chat.id,
        bikecheck.telegramImageId,
        {
          caption,
          reply_markup: getPrivateBikecheckKeyboard(bikecheck),
          parse_mode: 'MarkdownV2',
        },
      );

      return;
    }

    await ctx.tg.sendPhoto(primaryMessage.chat.id, bikecheck.telegramImageId, {
      caption,
      reply_markup: getPublicBikecheckKeyboard(bikecheck),
      parse_mode: 'MarkdownV2',
    });
  }

  private async switchBikecheck(
    ctx: Context,
    direction: 'next' | 'previous',
  ): Promise<void> {
    const client = getConnectionFromContext(ctx);
    const callbackQuery = getContextCallbackQuery(ctx);
    const data = parseCallbackData<IBikecheckCommandData>(
      getCallbackQueryData(callbackQuery),
    );

    const sourceBikecheck = await this.bikecheckService.getById(
      client,
      data.bikecheckId,
    );

    const activeBikechecks = await this.bikecheckService.findActive(
      client,
      sourceBikecheck.userId,
    );

    if (activeBikechecks.length === 0) {
      await ctx.tg.answerCbQuery(
        callbackQuery.id,
        'Похоже этот пользователь удалил свои байкчеки',
      );
      return;
    }

    const sourceBikecheckIndex = activeBikechecks.findIndex(
      (bc) => bc.id === sourceBikecheck.id,
    );

    const nextBikecheckIndex =
      direction === 'next'
        ? getNextIndex(sourceBikecheckIndex, activeBikechecks.length)
        : getPreviousIndex(sourceBikecheckIndex, activeBikechecks.length);

    const nextBikecheck = activeBikechecks[nextBikecheckIndex];

    if (nextBikecheck.id === sourceBikecheck.id) {
      await ctx.tg.answerCbQuery(callbackQuery.id);
      return;
    }

    await this.editBikecheckMessage(ctx, nextBikecheck, activeBikechecks);
  }

  private async processVoteCommand(
    ctx: Context,
    points: number,
  ): Promise<void> {
    const client = getConnectionFromContext(ctx);
    const callbackQuery = getContextCallbackQuery(ctx);
    const { bikecheckId } = parseCallbackData<IBikecheckCommandData>(
      getCallbackQueryData(callbackQuery),
    );

    const bikecheck = await this.bikecheckService.getById(client, bikecheckId);

    if (bikecheck.userId === callbackQuery.from.id.toString()) {
      await ctx.tg.answerCbQuery(
        callbackQuery.id,
        'Нельзя голосовать за свой байк',
      );
      return;
    }

    let vote = await this.bikecheckVoteService.findUserVote(
      client,
      callbackQuery.from.id.toString(),
      bikecheckId,
    );

    if (vote && vote.points === points) {
      await ctx.tg.answerCbQuery(callbackQuery.id);
      return;
    }

    if (!vote) {
      vote = await this.bikecheckVoteService.create(
        client,
        bikecheckId,
        callbackQuery.from.id.toString(),
        points,
      );
    } else {
      vote.points = points;
      vote = await this.bikecheckVoteService.update(client, vote);
    }

    const activeBikechecks = await this.bikecheckService.findActive(
      client,
      bikecheck.userId,
    );

    await this.editBikecheckMessage(ctx, bikecheck, activeBikechecks);
    await ctx.tg.answerCbQuery(callbackQuery.id, 'Готово!');
  }

  private async processToggleOnSaleCommand(ctx: Context): Promise<void> {
    const client = getConnectionFromContext(ctx);
    const callbackQuery = getContextCallbackQuery(ctx);
    const data = parseCallbackData<IBikecheckCommandData>(
      getCallbackQueryData(callbackQuery),
    );

    let bikecheck = await this.bikecheckService.getById(
      client,
      data.bikecheckId,
    );

    if (bikecheck.userId !== callbackQuery.from.id.toString()) {
      await ctx.tg.answerCbQuery(
        callbackQuery.id,
        'Нельзя выставлять или снимать с продажи чужие байки',
      );
      return;
    }

    bikecheck.onSale = !bikecheck.onSale;
    bikecheck = await this.bikecheckService.updateBikecheck(client, bikecheck);

    const activeBikechecks = await this.bikecheckService.findActive(
      client,
      bikecheck.userId,
    );

    await this.editBikecheckMessage(ctx, bikecheck, activeBikechecks);
    await ctx.tg.answerCbQuery(callbackQuery.id);
  }

  private async processDeleteCommand(ctx: Context): Promise<void> {
    const client = getConnectionFromContext(ctx);
    const callbackQuery = getContextCallbackQuery(ctx);
    const data = parseCallbackData<IBikecheckCommandData>(
      getCallbackQueryData(callbackQuery),
    );

    const bikecheck = await this.bikecheckService.getById(
      client,
      data.bikecheckId,
    );

    if (bikecheck.userId !== callbackQuery.from.id.toString()) {
      await ctx.tg.answerCbQuery(
        callbackQuery.id,
        'Нельзя удалять чужие байкчеки',
      );
      return;
    }

    bikecheck.isActive = false;

    await this.bikecheckService.updateBikecheck(client, bikecheck);

    const activeBikechecks = await this.bikecheckService.findActive(
      client,
      bikecheck.userId,
    );

    const message = getCallbackQueryMessage(callbackQuery);

    if (!activeBikechecks.length) {
      const caption = await this.templatesService.renderTemplate(
        join(__dirname, 'templates', 'no-bikechecks.mustache'),
        {},
      );

      await ctx.tg.editMessageMedia(
        message.chat.id,
        message.message_id,
        undefined,
        {
          type: 'photo',
          media:
            'https://cdn.pixabay.com/photo/2013/04/01/11/00/no-biking-98885__340.png',
          caption,
          parse_mode: 'MarkdownV2',
        },
      );
    } else {
      await this.editBikecheckMessage(
        ctx,
        activeBikechecks[0],
        activeBikechecks,
      );
    }

    await ctx.tg.answerCbQuery(callbackQuery.id);
  }

  private async processInlineQuery(ctx: Context): Promise<void> {
    const client = getConnectionFromContext(ctx);
    const inlineQuery = getContextInlineQuery(ctx);

    const user = await this.userService.getById(
      client,
      inlineQuery.from.id.toString(),
    );

    const bikechecks = await this.bikecheckService.findActive(client, user.id);

    if (!bikechecks.length) {
      await ctx.tg.answerInlineQuery(inlineQuery.id, []);
      return;
    }

    const results: InlineQueryResult[] = await Promise.all(
      bikechecks.map(async (bikecheck, i) => {
        const { likes, dislikes, rank } = await this.getBikecheckStats(
          client,
          bikecheck,
        );

        const caption = await this.templatesService.renderTemplate(
          join(__dirname, 'templates', 'bikecheck-caption.mustache'),
          {
            rank: rank,
            totalBikechecks: bikechecks.length > 1 ? bikechecks.length : null,
            bikecheckOrder: i + 1,
            likes,
            dislikes,
            stravaLink: user.stravaLink,
            onSale: bikecheck.onSale,
          },
        );

        return {
          id: `${user.id}-${bikecheck.id}`,
          type: 'photo',
          photo_file_id: bikecheck.telegramImageId,
          caption,
          parse_mode: 'MarkdownV2',
          reply_markup: getPublicBikecheckKeyboard(bikecheck),
        };
      }),
    );

    await ctx.tg.answerInlineQuery(inlineQuery.id, results, {
      cache_time: 5,
      is_personal: true,
    });
  }

  getCallbackQueryMiddleware(command: string): Middleware {
    switch (command) {
      case CALLBACK_QUERY_COMMANDS.DELETE_BIKECHECK:
        return composeMiddlewares([
          this.dbMiddlewareService.getMiddleware(),
          this.preliminaryDataSaveService.getMiddleware(),
          this.privateChatsOnlyMiddlewareService.getMiddleware(),
          this.featureAnalyticsService.getMiddleware(
            'bikecheck-command/callback-query/delete',
          ),
          this.processDeleteCommand.bind(this),
        ]);
      case CALLBACK_QUERY_COMMANDS.TOGGLE_ON_SALE:
        return composeMiddlewares([
          this.dbMiddlewareService.getMiddleware(),
          this.preliminaryDataSaveService.getMiddleware(),
          this.privateChatsOnlyMiddlewareService.getMiddleware(),
          this.featureAnalyticsService.getMiddleware(
            'bikecheck-command/callback-query/toggle-on-sale',
          ),
          this.processToggleOnSaleCommand.bind(this),
        ]);
      case CALLBACK_QUERY_COMMANDS.LIKE:
        return composeMiddlewares([
          this.dbMiddlewareService.getMiddleware(),
          this.preliminaryDataSaveService.getMiddleware(),
          this.featureAnalyticsService.getMiddleware(
            'bikecheck-command/callback-query/like',
          ),
          (ctx) => this.processVoteCommand(ctx, 1),
        ]);
      case CALLBACK_QUERY_COMMANDS.DISLIKE:
        return composeMiddlewares([
          this.dbMiddlewareService.getMiddleware(),
          this.preliminaryDataSaveService.getMiddleware(),
          this.featureAnalyticsService.getMiddleware(
            'bikecheck-command/callback-query/dislike',
          ),
          (ctx) => this.processVoteCommand(ctx, -1),
        ]);
      case CALLBACK_QUERY_COMMANDS.SHOW_NEXT_BIKECHECK:
        return composeMiddlewares([
          this.dbMiddlewareService.getMiddleware(),
          this.preliminaryDataSaveService.getMiddleware(),
          this.featureAnalyticsService.getMiddleware(
            'bikecheck-command/callback-query/show-next-bikecheck',
          ),
          (ctx) => this.switchBikecheck(ctx, 'next'),
        ]);
      case CALLBACK_QUERY_COMMANDS.SHOW_PREVIOUS_BIKECHECK:
        return composeMiddlewares([
          this.dbMiddlewareService.getMiddleware(),
          this.preliminaryDataSaveService.getMiddleware(),
          this.featureAnalyticsService.getMiddleware(
            'bikecheck-command/callback-query/show-previous-bikecheck',
          ),
          (ctx) => this.switchBikecheck(ctx, 'previous'),
        ]);
      default:
        throw new Error(
          `Tried to get middleware for unrecognized command ${command}`,
        );
    }
  }

  getInlineQueryMiddleware(): Middleware {
    return composeMiddlewares([
      this.dbMiddlewareService.getMiddleware(),
      this.preliminaryDataSaveService.getMiddleware(),
      this.featureAnalyticsService.getMiddleware(
        'bikecheck-command/inline-command',
      ),
      this.processInlineQuery.bind(this),
    ]);
  }

  getMessageMiddleware(): Middleware {
    return composeMiddlewares([
      this.dbMiddlewareService.getMiddleware(),
      this.preliminaryDataSaveService.getMiddleware(),
      this.featureAnalyticsService.getMiddleware(
        'bikecheck-command/message-command',
      ),
      this.messageAgeMiddlewareService.getMiddleware(),
      this.processMessage.bind(this),
    ]);
  }
}
