import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import { FeatureAnalytics } from './feature-analytics.entity';
import { insert } from './queries';
import { FEATURE_KEYS } from './constants';

@Injectable()
export class FeatureAnalyticsService {
  async create(
    client: PoolClient,
    featureKey: (typeof FEATURE_KEYS)[keyof typeof FEATURE_KEYS],
    chatId: string,
    userId: string,
  ): Promise<FeatureAnalytics> {
    const rows = await insert.run({ featureKey, chatId, userId }, client);
    return FeatureAnalytics.fromTableRow(rows[0]);
  }
}
