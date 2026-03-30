import { BaseEntity } from 'src/common/database/base-entity';

export interface IFeatureAnalyticsTableRow {
  chatId: string;
  createdAt: Date;
  featureKey: number;
  id: string;
  userId: string;
}

export class FeatureAnalytics extends BaseEntity {
  id: string;
  featureKey: number;
  chatId: string;
  userId: string;
  createdAt: Date;

  static fromTableRow(row: IFeatureAnalyticsTableRow): FeatureAnalytics {
    return new FeatureAnalytics(
      row.id,
      row.featureKey,
      row.chatId,
      row.userId,
      row.createdAt,
    );
  }

  constructor(
    id: string,
    featureKey: number,
    chatId: string,
    userId: string,
    createdAt: Date,
  ) {
    super();

    this.id = id;
    this.featureKey = featureKey;
    this.chatId = chatId;
    this.userId = userId;
    this.createdAt = createdAt;
  }
}
