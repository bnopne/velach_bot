import { User as TelegramUser } from '@telegraf/types';

import { BaseEntity } from 'src/common/database/base-entity';
import { type TOptional } from 'src/common/types/utils';

export type TConstructorParams = {
  firstName: TOptional<string>;
  id: string;
  isBot: TOptional<boolean>;
  lastName: TOptional<string>;
  stravaLink: TOptional<string>;
  username: TOptional<string>;
};

export type TTableRow = {
  firstName: string | null;
  id: string;
  isBot: boolean | null;
  lastName: string | null;
  stravaLink: string | null;
  username: string | null;
};

export class User extends BaseEntity {
  firstName: TOptional<string>;
  id: string;
  isBot: TOptional<boolean>;
  lastName: TOptional<string>;
  stravaLink: TOptional<string>;
  username: TOptional<string>;

  static fromTableRow(row: TTableRow): User {
    return new User(row);
  }

  static fromTelegramUser(telegramUser: TelegramUser): User {
    return new User({
      id: telegramUser.id.toString(10),
      firstName: telegramUser.first_name,
      lastName: telegramUser.last_name,
      username: telegramUser.username,
      isBot: telegramUser.is_bot,
      stravaLink: undefined,
    });
  }

  constructor(params: TConstructorParams) {
    super();

    this.id = params.id;
    this.firstName = params.firstName;
    this.lastName = params.lastName;
    this.username = params.username;
    this.isBot = params.isBot;
    this.stravaLink = params.stravaLink;
  }

  updateFromTelegramUser(tgUser: TelegramUser): void {
    if (this.id !== tgUser.id.toString()) {
      throw new Error(
        `Tried to update user ${this.id} with user data ${tgUser.id}`,
      );
    }

    this.firstName = tgUser.first_name;
    this.lastName = tgUser.last_name;
    this.isBot = tgUser.is_bot;
    this.username = tgUser.username;
  }
}
