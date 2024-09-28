import { BaseEntity } from 'src/common/database/base-entity';
import { TOptional } from 'src/common/types/utils';

export type TBikecheckConstructorParams = {
  id: string;
  userId: string;
  telegramImageId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  onSale: TOptional<boolean>;
  saleRank: TOptional<number>;
};

export type TBikecheckTableRow = {
  createdAt: Date;
  id: string;
  isActive: boolean;
  onSale: boolean | null;
  saleRank: number | null;
  telegramImageId: string;
  updatedAt: Date;
  userId: string;
};

export class Bikecheck extends BaseEntity {
  id: string;
  userId: string;
  telegramImageId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  onSale: TOptional<boolean>;
  saleRank: TOptional<number>;

  static fromTableRow(row: TBikecheckTableRow): Bikecheck {
    return new Bikecheck(row);
  }

  constructor(params: TBikecheckConstructorParams) {
    super();

    this.id = params.id;
    this.userId = params.userId;
    this.telegramImageId = params.telegramImageId;
    this.isActive = params.isActive;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
    this.onSale = params.onSale;
    this.saleRank = params.saleRank;
  }
}
