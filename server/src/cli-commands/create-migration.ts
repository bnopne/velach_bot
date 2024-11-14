import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { SRC_DIR } from './common';

export async function createMigration(name: string): Promise<void> {
  const path = join(
    SRC_DIR,
    'common',
    'database',
    'migrations',
    `${new Date().getTime()}-${name}.sql`,
  );

  writeFileSync(path, `-- Migration: ${name}`);
}
