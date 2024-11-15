import { Module } from '@nestjs/common';

import { TelegramBotModule } from 'src/modules/telegram-bot/telegram-bot.module';
import { ApiModule } from 'src/modules/api/api.module';

@Module({
  imports: [TelegramBotModule, ApiModule],
  controllers: [],
  providers: [],
})
export class MainModule {}
