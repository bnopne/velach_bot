import { cwd } from 'node:process';
import { join } from 'node:path';

import { Logger } from '@nestjs/common';

import { type ICliCommand } from './types';

export const logger = new Logger('CLI');

export async function execute(command: ICliCommand): Promise<void> {
  try {
    await command();
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}

export const SRC_DIR = join(cwd(), 'src');
