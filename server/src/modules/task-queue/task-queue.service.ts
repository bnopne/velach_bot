import { Injectable, Logger, type OnModuleDestroy } from '@nestjs/common';

import { type ITask } from './types';

const logger = new Logger('Tasks Service');

@Injectable()
export class TaskQueueService implements OnModuleDestroy {
  private taskQueue: ITask[];
  private currentTask?: ITask;
  private intervalId?: ReturnType<typeof setInterval>;
  private retryTimeouts: ReturnType<typeof setTimeout>[];

  constructor() {
    this.taskQueue = [];
    this.retryTimeouts = [];
  }

  private async executeTask(task: ITask): Promise<void> {
    if (this.currentTask) {
      logger.error(
        `Tried to execute task before current task finished, current task: ${this.currentTask.name}, tried to start: ${task.name}`,
      );
      return;
    }

    this.currentTask = task;

    try {
      await task.execute();
    } catch (error) {
      logger.error(`Error while executing task: ${task.name}`);
      logger.error(error);

      if (task.retryDelay) {
        this.retryTimeouts.push(
          setTimeout(() => {
            this.enqueueTask(task);
          }, task.retryDelay),
        );
      }
    }

    this.currentTask = undefined;

    if (this.taskQueue.length === 0) {
      this.stopQueue();
    }
  }

  private startQueue() {
    this.intervalId = setInterval(async () => {
      if (this.currentTask) {
        return;
      }

      const task = this.taskQueue.shift();

      if (!task) {
        return;
      }

      await this.executeTask(task);
    }, 1000);
  }

  private stopQueue() {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
  }

  onModuleDestroy() {
    this.stopQueue();

    this.retryTimeouts.forEach((timeoutId) => {
      clearTimeout(timeoutId);
    });
  }

  enqueueTask(task: ITask) {
    this.taskQueue.push(task);

    if (!this.intervalId) {
      this.startQueue();
    }
  }
}
