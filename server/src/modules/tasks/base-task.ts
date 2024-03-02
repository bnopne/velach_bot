import { ModuleRef } from '@nestjs/core';

export abstract class BaseTask<PrepareResult, ExecutionResult> {
  readonly name: string;

  abstract prepare(moduleRef: ModuleRef): Promise<PrepareResult>;
  abstract execute(prepareResult: PrepareResult): Promise<ExecutionResult>;
  abstract cleanup(executionResult: ExecutionResult): Promise<unknown>;
}
