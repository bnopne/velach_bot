import { BaseEntity } from 'src/common/database/base-entity';

export interface IBikecheckChatMtmConstructorParams {
  bikecheckId: string;
  chatId: string;
  isBanned: boolean;
}

export interface ITableRow {
  bikecheckId: string;
  chatId: string;
  isBanned: boolean;
}

export class BikecheckChatMtm extends BaseEntity {
  bikecheckId: string;
  chatId: string;
  isBanned: boolean;

  static fromTableRow(row: ITableRow): BikecheckChatMtm {
    return new BikecheckChatMtm(row);
  }

  constructor(params: IBikecheckChatMtmConstructorParams) {
    super();

    this.bikecheckId = params.bikecheckId;
    this.chatId = params.chatId;
    this.isBanned = params.isBanned;
  }
}
