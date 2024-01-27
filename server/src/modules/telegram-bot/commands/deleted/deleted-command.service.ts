import { Injectable } from '@nestjs/common';
import { join } from 'path';

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
import { MessageAgeMiddlewareService } from 'src/modules/telegram-bot/middlewares/message-age-middleware.service';

import { getDeletedKeyboard } from './keyboards';
import { CALLBACK_QUERY_COMMANDS } from 'src/common/constants';

function getNextBikecheckIndex(
  currentIndex: number,
  totalBikechecks: number,
): number {
  return (currentIndex + 1) % totalBikechecks;
}

function getPreviousBikecheckIndex(
  currentIndex: number,
  totalBikechecks: number,
): number {
  return currentIndex <= 0 ? totalBikechecks - 1 : currentIndex - 1;
}

@Injectable()
export class DeletedCommandService {
  constructor(
    private templatesService: TemplatesService,
    private dbMiddlewareService: DbMiddlewareService,
    private preliminaryDataSaveService: PreliminaryDataSaveService,
    private privateChatsOnlyMiddlewareService: PrivateChatsOnlyMiddlewareService,
    private userService: UserService,
    private bikecheckService: BikecheckService,
    private featureAnalyticsMiddlewareService: FeatureAnalyticsMiddlewareService,
    private messageAgeMiddlewareService: MessageAgeMiddlewareService,
  ) {}

  private async processCommand(ctx: Context): Promise<void> {
    const client = getContextConnectionOrFail(ctx);
    const message = getContextMessageOrFail(ctx);

    const user = await this.userService.getById(
      client,
      getMessageFromOrFail(message).id.toString(),
    );

    const bikechecks = await this.bikecheckService.findDeleted(client, user.id);

    if (!bikechecks.length) {
      const text = await this.templatesService.renderTemplate(
        join(__dirname, 'templates', 'no-bikechecks.mustache'),
        {},
      );

      await ctx.telegram.sendMessage(message.chat.id, text, {
        reply_to_message_id: message.message_id,
        parse_mode: 'MarkdownV2',
        message_thread_id: message.is_topic_message
          ? message.message_thread_id
          : undefined,
      });
    } else {
      await ctx.telegram.sendPhoto(
        message.chat.id,
        bikechecks[0].telegramImageId,
        {
          reply_to_message_id: message.message_id,
          parse_mode: 'MarkdownV2',
          reply_markup: getDeletedKeyboard(bikechecks[0]),
          message_thread_id: message.is_topic_message
            ? message.message_thread_id
            : undefined,
        },
      );
    }
  }

  private async switchDeleted(
    ctx: Context,
    direction: 'next' | 'previous',
  ): Promise<void> {
    const client = getContextConnectionOrFail(ctx);
    const callbackQuery = getContextCallbackQueryOrFail(ctx);
    const data = parseCallbackData<IBikecheckCommandData>(
      getCallbackQueryDataOrFail(callbackQuery),
    );

    const sourceBikecheck = await this.bikecheckService.getById(
      client,
      data.bikecheckId,
    );

    const bikechecks = await this.bikecheckService.findDeleted(
      client,
      sourceBikecheck.userId,
    );

    if (bikechecks.length === 0) {
      await ctx.telegram.answerCbQuery(
        callbackQuery.id,
        'Похоже этот пользователь восстановил все свои байкчеки',
      );
      return;
    }

    const sourceBikecheckIndex = bikechecks.findIndex(
      (bc) => bc.id === sourceBikecheck.id,
    );

    const nextBikecheckIndex =
      direction === 'next'
        ? getNextBikecheckIndex(sourceBikecheckIndex, bikechecks.length)
        : getPreviousBikecheckIndex(sourceBikecheckIndex, bikechecks.length);

    const nextBikecheck = bikechecks[nextBikecheckIndex];

    if (nextBikecheck.id === sourceBikecheck.id) {
      await ctx.telegram.answerCbQuery(callbackQuery.id);
      return;
    }

    const message = getCallbackQueryMessageOrFail(callbackQuery);

    await ctx.telegram.editMessageMedia(
      message.chat.id,
      message.message_id,
      undefined,
      {
        type: 'photo',
        media: nextBikecheck.telegramImageId,
        parse_mode: 'MarkdownV2',
      },
      {
        reply_markup: getDeletedKeyboard(nextBikecheck),
      },
    );
  }

  private async processRestoreBikecheckCommand(ctx: Context): Promise<void> {
    const client = getContextConnectionOrFail(ctx);
    const callbackQuery = getContextCallbackQueryOrFail(ctx);
    const data = parseCallbackData<IBikecheckCommandData>(
      getCallbackQueryDataOrFail(callbackQuery),
    );

    const bikecheck = await this.bikecheckService.getById(
      client,
      data.bikecheckId,
    );

    bikecheck.isActive = true;

    await this.bikecheckService.updateBikecheck(client, bikecheck);

    const deletedBikechecks = await this.bikecheckService.findDeleted(
      client,
      bikecheck.userId,
    );

    if (deletedBikechecks.length === 0) {
      await ctx.telegram.answerCbQuery(
        callbackQuery.id,
        'Похоже этот пользователь восстановил все свои байкчеки',
      );
      return;
    }

    if (deletedBikechecks[0].id === bikecheck.id) {
      await ctx.telegram.answerCbQuery(callbackQuery.id);
      return;
    }

    const message = getCallbackQueryMessageOrFail(callbackQuery);

    await ctx.telegram.editMessageMedia(
      message.chat.id,
      message.message_id,
      undefined,
      {
        type: 'photo',
        media: deletedBikechecks[0].telegramImageId,
        parse_mode: 'MarkdownV2',
      },
      {
        reply_markup: getDeletedKeyboard(deletedBikechecks[0]),
      },
    );
  }

  getCallbackQueryMiddleware(command: string): Middleware {
    switch (command) {
      case CALLBACK_QUERY_COMMANDS.RESTORE_BIKECHECK:
        return composeMiddlewares([
          this.dbMiddlewareService.getMiddleware(),
          this.preliminaryDataSaveService.getMiddleware(),
          this.privateChatsOnlyMiddlewareService.getMiddleware(),
          this.featureAnalyticsMiddlewareService.getMiddleware(
            'deleted-command/callback-query/restore',
          ),
          this.processRestoreBikecheckCommand.bind(this),
        ]);
      case CALLBACK_QUERY_COMMANDS.SHOW_NEXT_DELETED_BIKECHECK:
        return composeMiddlewares([
          this.dbMiddlewareService.getMiddleware(),
          this.preliminaryDataSaveService.getMiddleware(),
          this.privateChatsOnlyMiddlewareService.getMiddleware(),
          this.featureAnalyticsMiddlewareService.getMiddleware(
            'deleted-command/callback-query/show-next',
          ),
          (ctx) => this.switchDeleted(ctx, 'next'),
        ]);
      case CALLBACK_QUERY_COMMANDS.SHOW_PREVIOUS_DELETED_BIKECHECK:
        return composeMiddlewares([
          this.dbMiddlewareService.getMiddleware(),
          this.preliminaryDataSaveService.getMiddleware(),
          this.privateChatsOnlyMiddlewareService.getMiddleware(),
          this.featureAnalyticsMiddlewareService.getMiddleware(
            'deleted-command/callback-query/show-previous',
          ),
          (ctx) => this.switchDeleted(ctx, 'previous'),
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
      this.privateChatsOnlyMiddlewareService.getMiddleware(),
      this.featureAnalyticsMiddlewareService.getMiddleware(
        'deleted-command/message-command',
      ),
      this.messageAgeMiddlewareService.getMiddleware(),
      this.processCommand.bind(this),
    ]);
  }
}
