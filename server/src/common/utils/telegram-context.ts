import { PoolClient } from 'pg';
import {
  Message,
  PhotoSize,
  Chat,
  User,
  CallbackQuery,
  InlineQuery,
  MaybeInaccessibleMessage,
} from '@telegraf/types';

import { Context } from 'src/common/types/bot';

/**
 * Getters that fail if no value can be returned
 */

export function getContextConnectionOrFail(context: Context): PoolClient {
  if (!context.database) {
    throw new Error('No database object in context');
  }

  if (!context.database.connection) {
    throw new Error('No connection in context');
  }

  return context.database.connection;
}

export function getContextChatOrFail(ctx: Context): Chat {
  if (!ctx.chat) {
    throw new Error('No chat in given context');
  }

  return ctx.chat;
}

export function getContextMessageOrFail(ctx: Context): Message {
  if (!ctx.message) {
    throw new Error('No message in given context');
  }

  return ctx.message;
}

export function getContextCallbackQueryOrFail(ctx: Context): CallbackQuery {
  if (!ctx.callbackQuery) {
    throw new Error('Context has no callback query');
  }

  return ctx.callbackQuery;
}

export function getContextInlineQueryOrFail(ctx: Context): InlineQuery {
  if (!ctx.inlineQuery) {
    throw new Error('context has no inline query');
  }

  return ctx.inlineQuery;
}

export function getMessageChatOrFail(msg: Message): Chat {
  if (!msg.chat) {
    throw new Error('No chat in given context');
  }

  return msg.chat;
}

export function getMessageFromOrFail(msg: Message): User {
  if (!msg.from) {
    throw new Error('No user in given context');
  }

  return msg.from;
}

export function getCallbackQueryDataOrFail(
  callbackQuery: CallbackQuery,
): string {
  const data = (callbackQuery as CallbackQuery.DataQuery).data;

  if (!data) {
    throw new Error('No data in given callback query');
  }

  return data;
}

export function getCallbackQueryMessageOrFail(
  callbackQuery: CallbackQuery,
): MaybeInaccessibleMessage {
  if (!callbackQuery.message) {
    throw new Error('Callback query has no message');
  }

  return callbackQuery.message;
}

/**
 * Getters that return null if no value could be returned
 */

export function getContextMessage(ctx: Context): Message | null {
  return ctx.message || null;
}

export function getMessageFrom(message: Message): User | null {
  return message.from || null;
}

export function getMessageBiggestPhoto(message: Message): PhotoSize | null {
  if (!(message as Message.PhotoMessage).photo) {
    return null;
  }

  return (message as Message.PhotoMessage).photo.sort(
    (a, b) => b.width - a.width,
  )[0];
}

export function getMessageText(msg: Message): string | null {
  return (msg as Message.TextMessage).text;
}

export function getMessageReplyTo(msg: Message): Message | null {
  const reply = (msg as Message.CommonMessage).reply_to_message;

  if (!reply) {
    return null;
  }

  if ((reply as Message.ForumTopicCreatedMessage).forum_topic_created) {
    return null;
  }

  return reply;
}
