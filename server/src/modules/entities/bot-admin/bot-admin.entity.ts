import { BaseEntity } from 'src/common/database/base-entity';

export type TBotAdminConstructorParams = {
  userId: string;
};

export type TTableRow = {
  userId: string;
};

export class BotAdmin extends BaseEntity {
  userId: string;

  static fromTableRow(row: TTableRow): BotAdmin {
    return new BotAdmin(row);
  }

  constructor(params: TBotAdminConstructorParams) {
    super();

    this.userId = params.userId;
  }
}
