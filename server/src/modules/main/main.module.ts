import { Module } from '@nestjs/common';

import { TelegramBotModule } from 'src/modules/telegram-bot/telegram-bot.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { AdminApiModule } from 'src/modules/admin-api/admin-api.module';

@Module({
  imports: [TelegramBotModule, AuthModule, AdminApiModule],
  controllers: [],
  providers: [],
})
export class MainModule {}
