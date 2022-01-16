import { Module } from '@nestjs/common';

import { FeatureAnalyticsService } from './feature-analytics.service';

@Module({
  providers: [FeatureAnalyticsService],
  exports: [FeatureAnalyticsService],
})
export class FeatureAnalyticsModule {}
