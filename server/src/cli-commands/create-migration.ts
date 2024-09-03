import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

export async function createMigration(name: string): Promise<void> {
  const path = join(
    __dirname,
    'common',
    'database',
    'migrations',
    `${new Date().getTime()}-${name}.sql`,
  );

  writeFileSync(path, `-- Migration: ${name}`);
}
