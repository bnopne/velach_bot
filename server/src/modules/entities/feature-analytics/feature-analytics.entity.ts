import { BaseEntity } from 'src/common/database/base-entity';

export interface ITableRow {
  chatId: string;
  createdAt: Date;
  feature: string;
  id: string;
  userId: string;
}

export class FeatureAnalytics extends BaseEntity {
  id: string;
  feature: string;
  chatId: string;
  userId: string;
  createdAt: Date;

  static fromTableRow(row: ITableRow): FeatureAnalytics {
    return new FeatureAnalytics(
      row.id,
      row.feature,
      row.chatId,
      row.userId,
      row.createdAt,
    );
  }

  constructor(
    id: string,
    feature: string,
    chatId: string,
    userId: string,
    createdAt: Date,
  ) {
    super();

    this.id = id;
    this.feature = feature;
    this.chatId = chatId;
    this.userId = userId;
    this.createdAt = createdAt;
  }
}
