import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PgPoolModule } from 'src/modules/pg-pool/pg-pool.module';
import { EntitiesModule } from 'src/modules/entities/entities.module';

import { DbMiddlewareService } from './db-middleware.service';
import { MessageAgeMiddlewareService } from './message-age-middleware.service';
import { PreliminaryDataSaveService } from './preliminary-data-save.service';
import { PrivateChatsOnlyMiddlewareService } from './private-chats-only.service';
import { FeatureAnalyticsMiddlewareService } from './feature-analytics.service';

@Module({
  imports: [PgPoolModule, EntitiesModule, ConfigModule],
  providers: [
    DbMiddlewareService,
    PreliminaryDataSaveService,
    PrivateChatsOnlyMiddlewareService,
    FeatureAnalyticsMiddlewareService,
    MessageAgeMiddlewareService,
  ],
  exports: [
    DbMiddlewareService,
    PreliminaryDataSaveService,
    PrivateChatsOnlyMiddlewareService,
    FeatureAnalyticsMiddlewareService,
    MessageAgeMiddlewareService,
  ],
})
export class MiddlewaresModule {}
