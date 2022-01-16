import { BaseEntity } from 'src/common/database/base-entity';
import { Optional } from 'src/common/types/utils';

export interface IBikecheckConstructorParams {
  id: string;
  userId: string;
  telegramImageId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  onSale: Optional<boolean>;
  saleRank: Optional<number>;
}

export interface ITableRow {
  createdAt: Date;
  id: string;
  isActive: boolean;
  onSale: boolean | null;
  saleRank: number | null;
  telegramImageId: string;
  updatedAt: Date;
  userId: string;
}

export class Bikecheck extends BaseEntity {
  id: string;
  userId: string;
  telegramImageId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  onSale: Optional<boolean>;
  saleRank: Optional<number>;

  static fromTableRow(row: ITableRow): Bikecheck {
    return new Bikecheck(row);
  }

  constructor(params: IBikecheckConstructorParams) {
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
