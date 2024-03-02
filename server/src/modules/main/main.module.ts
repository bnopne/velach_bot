import { Module } from '@nestjs/common';

import { TelegramBotModule } from 'src/modules/telegram-bot/telegram-bot.module';
import { AdminApiModule } from 'src/modules/admin-api/admin-api.module';
import { TasksModule } from 'src/modules/tasks/tasks.module';
import { FilesModule } from 'src/modules/files/files.module';

@Module({
  imports: [AdminApiModule, TelegramBotModule, TasksModule, FilesModule],
  controllers: [],
  providers: [],
})
export class MainModule {}
