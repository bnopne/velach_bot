import { BaseEntity } from 'src/common/database/base-entity';

export type TBikecheckChatMtmConstructorParams = {
  bikecheckId: string;
  chatId: string;
  isBanned: boolean;
};

export type TBikecheckChatMtmTableRow = {
  bikecheckId: string;
  chatId: string;
  isBanned: boolean;
};

export class BikecheckChatMtm extends BaseEntity {
  bikecheckId: string;
  chatId: string;
  isBanned: boolean;

  static fromTableRow(row: TBikecheckChatMtmTableRow): BikecheckChatMtm {
    return new BikecheckChatMtm(row);
  }

  constructor(params: TBikecheckChatMtmConstructorParams) {
    super();

    this.bikecheckId = params.bikecheckId;
    this.chatId = params.chatId;
    this.isBanned = params.isBanned;
  }
}
