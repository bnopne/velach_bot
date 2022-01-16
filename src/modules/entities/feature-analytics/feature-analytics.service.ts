import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import { FeatureAnalytics } from './feature-analytics.entity';
import { insert } from './queries';

@Injectable()
export class FeatureAnalyticsService {
  async create(
    client: PoolClient,
    feature: string,
    chatId: string,
    userId: string,
  ): Promise<FeatureAnalytics> {
    const rows = await insert.run({ feature, chatId, userId }, client);
    return FeatureAnalytics.fromTableRow(rows[0]);
  }
}
