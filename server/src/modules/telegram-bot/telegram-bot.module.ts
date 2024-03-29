import { Module } from '@nestjs/common';

import { PgPoolModule } from 'src/modules/pg-pool/pg-pool.module';
import { EntitiesModule } from 'src/modules/entities/entities.module';
import { CommandRouterModule } from 'src/modules/telegram-bot/command-router/command-router.module';
import { CallbackQueryRouterModule } from 'src/modules/telegram-bot/callback-query-router/callback-query-router.module';
import { BikecheckCommandModule } from 'src/modules/telegram-bot/commands/bikecheck/bikecheck-command.module';
import { TelegramBotService } from 'src/modules/telegram-bot/telegram-bot.service';
import { ConfigurationModule } from 'src/modules/configuration/configuration.module';

@Module({
  imports: [
    ConfigurationModule,
    PgPoolModule,
    EntitiesModule,
    CommandRouterModule,
    CallbackQueryRouterModule,
    BikecheckCommandModule,
  ],
  providers: [TelegramBotService],
})
export class TelegramBotModule {}
