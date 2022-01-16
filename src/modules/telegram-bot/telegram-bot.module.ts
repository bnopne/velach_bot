import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PgPoolModule } from 'src/modules/pg-pool/pg-pool.module';
import { EntitiesModule } from 'src/modules/entities/entities.module';
import { CommandRouterModule } from 'src/modules/command-router/command-router.module';
import { CallbackQueryRouterModule } from 'src/modules/callback-query-router/callback-query-router.module';
import { BikecheckCommandModule } from 'src/modules/commands/bikecheck/bikecheck-command.module';

import { TelegramBotService } from './telegram-bot.service';

@Module({
  imports: [
    ConfigModule,
    PgPoolModule,
    EntitiesModule,
    CommandRouterModule,
    CallbackQueryRouterModule,
    BikecheckCommandModule,
  ],
  providers: [TelegramBotService],
})
export class TelegramBotModule {}
