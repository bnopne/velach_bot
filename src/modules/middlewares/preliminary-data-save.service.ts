import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { Message, User as TgUser, Chat as TgChat, InlineQuery } from 'typegram';

import { Context, Middleware, MiddlewareNext } from 'src/common/types/bot';
import {
  getContextConnectionOrFail,
  getMessageChatOrFail,
  getMessageFromOrFail,
  getMessageReplyTo,
} from 'src/common/utils/context';
import { UserService } from 'src/modules/entities/user/user.service';
import { ChatService } from 'src/modules/entities/chat/chat.service';
import { Chat } from 'src/modules/entities/chat/chat.entity';
import { User } from 'src/modules/entities/user/user.entity';
import { UserChatMtmService } from 'src/modules/entities/user-chat-mtm/user-chat-mtm.service';
import { PoolClient } from 'pg';

const logger = new Logger('Preliminary Data Save Service');

@Injectable()
export class PreliminaryDataSaveService {
  constructor(
    private userService: UserService,
    private chatService: ChatService,
    private userChatMtmService: UserChatMtmService,
  ) {}

  getMiddleware(): Middleware {
    return this.middleware.bind(this);
  }

  private async middleware(
    context: Context,
    next: MiddlewareNext,
  ): Promise<void> {
    if (!context.message) {
      return next();
    }

    const client = getContextConnectionOrFail(context);

    await this.saveMessageData(client, context.message);

    const replyToMessage = getMessageReplyTo(context.message);

    if (replyToMessage) {
      await this.saveMessageData(client, replyToMessage);
    }

    if (context.inlineQuery) {
      await this.saveInlineQueryData(client, context.inlineQuery);
    }

    return next();
  }

  private async saveMessageData(
    client: PoolClient,
    message: Message,
  ): Promise<void> {
    let tgChat: TgChat | null = null;
    let chat: Chat | null = null;

    try {
      tgChat = getMessageChatOrFail(message);
    } catch (err) {
      logger.error(err);
    }

    if (tgChat) {
      chat = await this.chatService.findById(client, tgChat.id.toString());

      if (chat) {
        chat.updateFromTelegramChat(tgChat);
      } else {
        chat = Chat.fromTelegramChat(tgChat);
      }

      await this.chatService.createOrUpdateChat(client, chat);
    }

    let tgUser: TgUser | null = null;
    let user: User | null = null;

    try {
      tgUser = getMessageFromOrFail(message);
    } catch (err) {
      logger.error(err);
    }

    if (tgUser) {
      user = await this.userService.findById(client, tgUser.id.toString());

      if (user) {
        user.updateFromTelegramUser(tgUser);
      } else {
        user = User.fromTelegramUser(tgUser);
      }

      await this.userService.createOrUpdateUser(client, user);
    }

    if (user && chat) {
      await this.userChatMtmService.createIfNotExists(client, user.id, chat.id);
    }
  }

  private async saveInlineQueryData(
    client: PoolClient,
    inlineQuery: InlineQuery,
  ): Promise<void> {
    const user = await this.userService.findById(
      client,
      inlineQuery.from.id.toString(),
    );

    if (!user) {
      return;
    }

    user.updateFromTelegramUser(inlineQuery.from);

    await this.userService.updateUser(client, user);
  }
}
