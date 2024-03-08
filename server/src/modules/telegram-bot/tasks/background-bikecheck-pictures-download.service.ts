import {
  Injectable,
  type OnModuleInit,
  type OnModuleDestroy,
} from '@nestjs/common';

import { BikecheckService } from 'src/modules/entities/bikecheck/bikecheck.service';
import { PgPoolService } from 'src/modules/pg-pool/pg-pool.service';
import { TaskQueueService } from 'src/modules/task-queue/task-queue.service';

import { DownloadBikecheckPicturesService } from './download-bikecheck-pictures.service';

@Injectable()
export class BackgroundBikecheckPicturesDownloadService
  implements OnModuleInit, OnModuleDestroy
{
  private intervalId?: ReturnType<typeof setInterval>;

  constructor(
    private readonly bikecheckService: BikecheckService,
    private readonly pgPoolService: PgPoolService,
    private readonly downloadBikecheckPicturesService: DownloadBikecheckPicturesService,
    private readonly taskQueueService: TaskQueueService,
  ) {}

  async onModuleInit() {
    this.intervalId = setInterval(async () => {
      const bikecheck = await this.pgPoolService.runInTransaction((client) =>
        this.bikecheckService.findBikecheckWithoutDownloadedPicture(client),
      );

      if (bikecheck) {
        this.taskQueueService.enqueueTask(
          this.downloadBikecheckPicturesService.getTask(bikecheck.id),
        );
      }
    }, 10 * 1000);
  }

  async onModuleDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
