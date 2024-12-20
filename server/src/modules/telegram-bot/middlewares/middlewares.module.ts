import { Module } from '@nestjs/common';

import { PgPoolModule } from 'src/modules/pg-pool/pg-pool.module';
import { EntitiesModule } from 'src/modules/entities/entities.module';
import { ConfigurationModule } from 'src/modules/configuration/configuration.module';

import { DbMiddlewareService } from './db-middleware.service';
import { MessageAgeMiddlewareService } from './message-age-middleware.service';
import { PreliminaryDataSaveService } from './preliminary-data-save-middleware.service';
import { PrivateChatsOnlyMiddlewareService } from './private-chats-only-middleware.service';
import { FeatureAnalyticsMiddlewareService } from './feature-analytics-middleware.service';
import { AdminsOnlyMiddlewareService } from './admins-only-middleware.service';

@Module({
  imports: [PgPoolModule, EntitiesModule, ConfigurationModule],
  providers: [
    DbMiddlewareService,
    PreliminaryDataSaveService,
    PrivateChatsOnlyMiddlewareService,
    FeatureAnalyticsMiddlewareService,
    MessageAgeMiddlewareService,
    AdminsOnlyMiddlewareService,
  ],
  exports: [
    DbMiddlewareService,
    PreliminaryDataSaveService,
    PrivateChatsOnlyMiddlewareService,
    FeatureAnalyticsMiddlewareService,
    MessageAgeMiddlewareService,
    AdminsOnlyMiddlewareService,
  ],
})
export class MiddlewaresModule {}
