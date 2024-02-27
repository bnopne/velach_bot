import { Module } from '@nestjs/common';

import { TelegramBotModule } from 'src/modules/telegram-bot/telegram-bot.module';
import { AdminApiModule } from 'src/modules/admin-api/admin-api.module';

@Module({
  imports: [AdminApiModule, TelegramBotModule],
  controllers: [],
  providers: [],
})
export class MainModule {}
