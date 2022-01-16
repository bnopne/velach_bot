import { PoolClient } from 'pg';
import {
  Message,
  PhotoSize,
  Chat,
  User,
  CallbackQuery,
  InlineQuery,
} from 'typegram';

import { Context } from 'src/common/types/bot';

export function getConnectionFromContext(context: Context): PoolClient {
  if (!context.database) {
    throw new Error('No database object in context');
  }

  if (!context.database.connection) {
    throw new Error('No connection in context');
  }

  return context.database.connection;
}

export function getMessageBiggestPhoto(message: Message): PhotoSize | null {
  if (!(message as Message.PhotoMessage).photo) {
    return null;
  }

  return (message as Message.PhotoMessage).photo.sort(
    (a, b) => b.width - a.width,
  )[0];
}

export function getReplyToMessage(ctx: Context): Message | null {
  const message = ctx.message as Message.CommonMessage;
  return message.reply_to_message ? message.reply_to_message : null;
}

export function getContextChat(ctx: Context): Chat {
  if (!ctx.chat) {
    throw new Error('No chat in given context');
  }

  return ctx.chat;
}

export function getContextFrom(ctx: Context): User {
  if (!ctx.from) {
    throw new Error('No user in given context');
  }

  return ctx.from;
}

export function getMessageChat(msg: Message): Chat {
  if (!msg.chat) {
    throw new Error('No chat in given context');
  }

  return msg.chat;
}

export function getMessageFrom(msg: Message): User {
  if (!msg.from) {
    throw new Error('No user in given context');
  }

  return msg.from;
}

export function getMessageFromContext(ctx: Context): Message {
  if (!ctx.message) {
    throw new Error('No message in given context');
  }

  return ctx.message;
}

export function getMessageText(msg: Message): string | null {
  return (msg as Message.TextMessage).text;
}

export function getMessageReplyTo(msg: Message): Message | null {
  const reply = (msg as Message.CommonMessage).reply_to_message;
  return reply || null;
}

export function getContextCallbackQuery(ctx: Context): CallbackQuery {
  if (!ctx.callbackQuery) {
    throw new Error('Context has no callback query');
  }

  return ctx.callbackQuery;
}

export function getCallbackQueryData(callbackQuery: CallbackQuery): string {
  const data = (callbackQuery as CallbackQuery.DataCallbackQuery).data;

  if (!data) {
    throw new Error('No data in given callback query');
  }

  return data;
}

export function getCallbackQueryMessage(callbackQuery: CallbackQuery): Message {
  if (!callbackQuery.message) {
    throw new Error('Callback query has no message');
  }

  return callbackQuery.message;
}

export function getContextInlineQuery(ctx: Context): InlineQuery {
  if (!ctx.inlineQuery) {
    throw new Error('context has no inline query');
  }

  return ctx.inlineQuery;
}

export function getContextInlineMessageId(ctx: Context): string {
  if (!ctx.inlineMessageId) {
    throw new Error('context has no inline message id');
  }

  return ctx.inlineMessageId;
}
