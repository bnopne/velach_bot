import { User as TelegramUser } from 'typegram';

import { BaseEntity } from 'src/common/database/base-entity';
import { Optional } from 'src/common/types/utils';

export interface IUserConstructorParams {
  firstName: Optional<string>;
  id: string;
  isBot: Optional<boolean>;
  lastName: Optional<string>;
  stravaLink: Optional<string>;
  username: Optional<string>;
}

export interface IUserTableRow {
  firstName: string | null;
  id: string;
  isBot: boolean | null;
  lastName: string | null;
  stravaLink: string | null;
  username: string | null;
}

export class User extends BaseEntity {
  firstName: Optional<string>;
  id: string;
  isBot: Optional<boolean>;
  lastName: Optional<string>;
  stravaLink: Optional<string>;
  username: Optional<string>;

  static fromTableRow(row: IUserTableRow): User {
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

  constructor(params: IUserConstructorParams) {
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
