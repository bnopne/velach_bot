import { Module } from '@nestjs/common';

import { TelegramBotModule } from 'src/modules/telegram-bot/telegram-bot.module';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [TelegramBotModule, AuthModule],
  controllers: [],
  providers: [],
})
export class MainModule {}
