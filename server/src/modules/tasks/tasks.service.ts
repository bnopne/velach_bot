import {
  Injectable,
  Logger,
  type OnModuleDestroy,
  type OnModuleInit,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import { ConfigurationService } from 'src/modules/configuration/configuration.service';

import { BaseTask } from './base-task';

const logger = new Logger('Tasks Service');

@Injectable()
export class TasksService implements OnModuleInit, OnModuleDestroy {
  private configurationService: ConfigurationService;
  private moduleRef: ModuleRef;

  private taskQueue: BaseTask<unknown, unknown>[];
  private currentTask?: BaseTask<unknown, unknown>;
  private intervalId?: ReturnType<typeof setTimeout>;

  constructor(
    moduleRef: ModuleRef,
    configurationService: ConfigurationService,
  ) {
    this.moduleRef = moduleRef;
    this.configurationService = configurationService;

    this.taskQueue = [];
  }

  enqueueTask(task: BaseTask<unknown, unknown>) {
    this.taskQueue.push(task);
  }

  private async executeTask(task: BaseTask<unknown, unknown>): Promise<void> {
    if (this.currentTask) {
      logger.error(
        `Tried to execute task before current task finished, current task: ${this.currentTask.name}, tried to start: ${task.name}`,
      );
      return;
    }

    this.currentTask = task;

    let prepareResult: unknown;

    try {
      prepareResult = await task.prepare(this.moduleRef);
    } catch (error) {
      logger.error(`Error while preparing task: ${task.name}`);
      logger.error(error);
      return;
    }

    let executeResult: unknown;

    try {
      executeResult = await task.execute(prepareResult);
    } catch (error) {
      logger.error(`Error while executing task: ${task.name}`);
      logger.error(error);
      return;
    }

    try {
      await task.cleanup(executeResult);
    } catch (error) {
      logger.error(`Error while task cleanup: ${task.name}`);
      logger.error(error);
    }

    this.currentTask = undefined;
  }

  onModuleInit() {
    this.intervalId = setInterval(async () => {
      if (this.currentTask) {
        return;
      }

      const task = this.taskQueue.shift();

      if (!task) {
        return;
      }

      await this.executeTask(task);
    }, this.configurationService.taskInterval);
  }

  onModuleDestroy() {
    clearInterval(this.intervalId);
  }
}
