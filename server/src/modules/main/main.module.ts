import { Module } from '@nestjs/common';

import { TelegramBotModule } from 'src/modules/telegram-bot/telegram-bot.module';

@Module({
  imports: [TelegramBotModule],
  controllers: [],
  providers: [],
})
export class MainModule {}
