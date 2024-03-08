import { Module } from '@nestjs/common';

import { BikecheckModule } from 'src/modules/entities/bikecheck/bikecheck.module';
import { PgPoolModule } from 'src/modules/pg-pool/pg-pool.module';
import { TelegrafInstanceModule } from 'src/modules/telegraf-instance/telegraf-instance.module';
import { FilesModule } from 'src/modules/files/files.module';
import { TaskQueueModule } from 'src/modules/task-queue/task-queue.module';

import { DownloadBikecheckPicturesService } from './download-bikecheck-pictures.service';
import { BackgroundBikecheckPicturesDownloadService } from './background-bikecheck-pictures-download.service';

@Module({
  imports: [
    BikecheckModule,
    PgPoolModule,
    TelegrafInstanceModule,
    FilesModule,
    TaskQueueModule,
  ],
  providers: [
    DownloadBikecheckPicturesService,
    BackgroundBikecheckPicturesDownloadService,
  ],
  exports: [DownloadBikecheckPicturesService],
})
export class TelegramBotTasksModule {}
