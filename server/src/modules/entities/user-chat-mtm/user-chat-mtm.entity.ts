import { BaseEntity } from 'src/common/database/base-entity';

export interface IUserChatMtmConstructorParams {
  chatId: string;
  userId: string;
}

export interface IUserChatMtmTableRow {
  chatId: string;
  userId: string;
}

export class UserChatMtm extends BaseEntity {
  chatId: string;
  userId: string;

  static fromTableRow(row: IUserChatMtmTableRow): UserChatMtm {
    return new UserChatMtm(row);
  }

  constructor(params: IUserChatMtmConstructorParams) {
    super();

    this.userId = params.userId;
    this.chatId = params.chatId;
  }
}
