import { cwd } from 'node:process';
import { join } from 'node:path';

import { type ICliCommand } from './types';

export async function execute(command: ICliCommand): Promise<void> {
  try {
    await command();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

export const SRC_DIR = join(cwd(), 'src');
