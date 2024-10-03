import { Chat as TelegramChat } from '@telegraf/types';

import { BaseEntity } from 'src/common/database/base-entity';
import { type TOptional } from 'src/common/types/utils';

export type TConstructorParams = {
  id: string;
  title: TOptional<string>;
  type: TOptional<string>;
};

export type TTableRow = {
  id: string;
  title: string | null;
  type: string | null;
};

export class Chat extends BaseEntity {
  id: string;
  title: TOptional<string>;
  type: TOptional<string>;

  static fromTableRow(row: TTableRow): Chat {
    return new Chat(row);
  }

  static fromTelegramChat(chatData: TelegramChat): Chat {
    if (chatData.type === 'private') {
      return new Chat({
        id: chatData.id.toString(),
        type: chatData.type,
        title: null,
      });
    }

    return new Chat({
      id: chatData.id.toString(),
      type: chatData.type,
      title: chatData.title,
    });
  }

  constructor(params: TConstructorParams) {
    super();

    this.id = params.id;
    this.title = params.title;
    this.type = params.type;
  }

  updateFromTelegramChat(tgChat: TelegramChat): void {
    if (tgChat.id.toString() !== this.id) {
      throw new Error(
        `Tried to update chat ${this.id} with data of chat ${tgChat.id}`,
      );
    }

    this.type = tgChat.type;

    if (tgChat.type !== 'private') {
      this.title = tgChat.title;
    }
  }
}
