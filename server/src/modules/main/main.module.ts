import { Module } from '@nestjs/common';

import { TelegramBotModule } from 'src/modules/telegram-bot/telegram-bot.module';
import { AdminApiModule } from 'src/modules/admin-api/admin-api.module';
import { TasksModule } from 'src/modules/tasks/tasks.module';

@Module({
  imports: [AdminApiModule, TelegramBotModule, TasksModule],
  controllers: [],
  providers: [],
})
export class MainModule {}
