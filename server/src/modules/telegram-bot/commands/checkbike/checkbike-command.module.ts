import { Module } from '@nestjs/common';

import { TemplatesModule } from 'src/modules/telegram-bot/templates/templates.module';
import { MiddlewaresModule } from 'src/modules/telegram-bot/middlewares/middlewares.module';
import { EntitiesModule } from 'src/modules/entities/entities.module';
import { TaskQueueModule } from 'src/modules/task-queue/task-queue.module';
import { TelegramBotTasksModule } from 'src/modules/telegram-bot/tasks/tasks.module';

import { CheckbikeCommandService } from './checkbike-command.service';

@Module({
  imports: [
    TemplatesModule,
    MiddlewaresModule,
    EntitiesModule,
    TaskQueueModule,
    TelegramBotTasksModule,
  ],
  providers: [CheckbikeCommandService],
  exports: [CheckbikeCommandService],
})
export class CheckbikeCommandModule {}
