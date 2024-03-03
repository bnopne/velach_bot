import { Module } from '@nestjs/common';

import { BikecheckModule } from 'src/modules/entities/bikecheck/bikecheck.module';
import { PgPoolModule } from 'src/modules/pg-pool/pg-pool.module';
import { TelegrafInstanceModule } from 'src/modules/telegraf-instance/telegraf-instance.module';
import { FilesModule } from 'src/modules/files/files.module';

import { DownloadBikecheckPicturesService } from './download-bikecheck-pictures.service';

@Module({
  imports: [BikecheckModule, PgPoolModule, TelegrafInstanceModule, FilesModule],
  providers: [DownloadBikecheckPicturesService],
  exports: [DownloadBikecheckPicturesService],
})
export class TelegramBotTasksModule {}
