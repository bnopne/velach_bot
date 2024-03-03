import { Module } from '@nestjs/common';

import { PgPoolModule } from 'src/modules/pg-pool/pg-pool.module';
import { EntitiesModule } from 'src/modules/entities/entities.module';
import { ConfigurationModule } from 'src/modules/configuration/configuration.module';
import { TelegrafInstanceModule } from 'src/modules/telegraf-instance/telegraf-instance.module';

import { CommandRouterModule } from './command-router/command-router.module';
import { CallbackQueryRouterModule } from './callback-query-router/callback-query-router.module';
import { BikecheckCommandModule } from './commands/bikecheck/bikecheck-command.module';
import { TelegramBotService } from './telegram-bot.service';

@Module({
  imports: [
    ConfigurationModule,
    TelegrafInstanceModule,
    PgPoolModule,
    EntitiesModule,
    CommandRouterModule,
    CallbackQueryRouterModule,
    BikecheckCommandModule,
  ],
  providers: [TelegramBotService],
})
export class TelegramBotModule {}
