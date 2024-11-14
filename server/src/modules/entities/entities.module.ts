import { Module } from '@nestjs/common';

import { BikecheckModule } from './bikecheck/bikecheck.module';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { UserChatMtmModule } from './user-chat-mtm/user-chat-mtm.module';
import { BikecheckVoteModule } from './bikecheck-vote/bikecheck-vote.module';
import { BikecheckChatMtmModule } from './bikecheck-chat-mtm/bikecheck-chat-mtm.module';
import { FeatureAnalyticsModule } from './feature-analytics/feature-analytics.module';
import { MigrationModule } from './migration/migration.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    BikecheckModule,
    ChatModule,
    UserChatMtmModule,
    BikecheckVoteModule,
    BikecheckChatMtmModule,
    UserModule,
    FeatureAnalyticsModule,
    MigrationModule,
    AdminModule,
  ],
  exports: [
    BikecheckModule,
    ChatModule,
    UserChatMtmModule,
    BikecheckVoteModule,
    BikecheckChatMtmModule,
    UserModule,
    FeatureAnalyticsModule,
    MigrationModule,
    AdminModule,
  ],
})
export class EntitiesModule {}
