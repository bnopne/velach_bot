import { Module } from '@nestjs/common';

import { ConfigurationModule } from 'src/modules/configuration/configuration.module';

import { TasksService } from './tasks.service';

@Module({
  imports: [ConfigurationModule],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
