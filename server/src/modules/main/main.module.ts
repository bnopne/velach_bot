import { Module } from '@nestjs/common';

import { TelegramBotModule } from 'src/modules/telegram-bot/telegram-bot.module';
// import { AdminSiteModule } from 'src/modules/admin-site/admin-site.module';

@Module({
  imports: [TelegramBotModule /*, AdminSiteModule*/],
  controllers: [],
  providers: [],
})
export class MainModule {}
