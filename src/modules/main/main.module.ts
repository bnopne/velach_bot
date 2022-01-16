import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TelegramBotModule } from 'src/modules/telegram-bot/telegram-bot.module';

@Module({
  imports: [TelegramBotModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class MainModule {}
