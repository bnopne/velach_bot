import { BaseEntity } from 'src/common/database/base-entity';

export interface IUserChatMtmConstructorParams {
  chatId: string;
  userId: string;
}

export interface ITableRow {
  chatId: string;
  userId: string;
}

export class UserChatMtm extends BaseEntity {
  chatId: string;
  userId: string;

  static fromTableRow(row: ITableRow): UserChatMtm {
    return new UserChatMtm(row);
  }

  constructor(params: IUserChatMtmConstructorParams) {
    super();

    this.userId = params.userId;
    this.chatId = params.chatId;
  }
}
