import { Module } from '@nestjs/common';

import { PgPoolModule } from 'src/modules/pg-pool/pg-pool.module';
import { EntitiesModule } from 'src/modules/entities/entities.module';
import { DbMiddlewareService } from 'src/modules/middlewares/db-middleware.service';

import { PreliminaryDataSaveService } from './preliminary-data-save.service';
import { PrivateChatsOnlyMiddlewareService } from './private-chats-only.service';
import { FeatureAnalyticsMiddlewareService } from './feature-analytics.service';

@Module({
  imports: [PgPoolModule, EntitiesModule],
  providers: [
    DbMiddlewareService,
    PreliminaryDataSaveService,
    PrivateChatsOnlyMiddlewareService,
    FeatureAnalyticsMiddlewareService,
  ],
  exports: [
    DbMiddlewareService,
    PreliminaryDataSaveService,
    PrivateChatsOnlyMiddlewareService,
    FeatureAnalyticsMiddlewareService,
  ],
})
export class MiddlewaresModule {}
