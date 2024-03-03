export interface ITask {
  name: string;
  execute: () => Promise<void>;
  retryDelay?: number;
}

export interface ITaskService {
  getTask: (...args: unknown[]) => ITask;
}
