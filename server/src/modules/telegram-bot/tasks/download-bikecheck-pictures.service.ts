import { join, extname } from 'path';

import { Injectable, type OnModuleInit } from '@nestjs/common';

import { BikecheckService } from 'src/modules/entities/bikecheck/bikecheck.service';
import { PgPoolService } from 'src/modules/pg-pool/pg-pool.service';
import { TelegrafInstance } from 'src/modules/telegraf-instance/telegraf-instance';
import { FilesService } from 'src/modules/files/files.service';
import { type ITask, type ITaskService } from 'src/modules/task-queue/types';

const BIKECHECKS_DIR = 'bikecheck-pictures';

@Injectable()
export class DownloadBikecheckPicturesService
  implements ITaskService, OnModuleInit
{
  constructor(
    private readonly bikecheckService: BikecheckService,
    private readonly pgPoolService: PgPoolService,
    private readonly telegrafInstance: TelegrafInstance,
    private readonly filesService: FilesService,
  ) {}

  private async execute(bikecheckId: string): Promise<void> {
    await this.pgPoolService.runInTransaction(async (client) => {
      const bikecheck = await this.bikecheckService.findById(
        client,
        bikecheckId,
      );

      if (!bikecheck) {
        return;
      }

      const imageFile = await this.telegrafInstance.bot.telegram.getFile(
        bikecheck.telegramImageId,
      );

      const downloadUrl = await this.telegrafInstance.bot.telegram.getFileLink(
        imageFile,
      );

      const response = await fetch(downloadUrl, {
        method: 'GET',
      });

      const arrayBuffer = await response.arrayBuffer();

      const buffer = Buffer.from(arrayBuffer);

      this.filesService.writeFile(
        join(
          BIKECHECKS_DIR,
          `${bikecheck.id}${extname(imageFile.file_path || '')}`,
        ),
        buffer,
      );

      await this.bikecheckService.setIsPictureDownloaded(
        client,
        bikecheck.id,
        true,
      );
    });
  }

  getTask(bikecheckId: string): ITask {
    return {
      name: `DOWNLOAD_BIKECHECK_PICTURE ${bikecheckId}`,
      execute: (() => this.execute(bikecheckId)).bind(this),
      retryDelay: 5000,
    };
  }

  async onModuleInit() {
    await this.filesService.mkdir(BIKECHECKS_DIR);
  }
}
