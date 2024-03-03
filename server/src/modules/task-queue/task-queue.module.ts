import { Module } from '@nestjs/common';

import { ConfigurationModule } from 'src/modules/configuration/configuration.module';

import { TaskQueueService } from './task-queue.service';

@Module({
  imports: [ConfigurationModule],
  providers: [TaskQueueService],
  exports: [TaskQueueService],
})
export class TaskQueueModule {}
