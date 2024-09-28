import { Module } from '@nestjs/common';

import { BotAdminService } from './bot-admin.service';

@Module({
  providers: [BotAdminService],
  exports: [BotAdminService],
})
export class BotAdminModule {}
