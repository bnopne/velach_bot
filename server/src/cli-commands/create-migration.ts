import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { cwd } from 'node:process';

export async function createMigration(name: string): Promise<void> {
  const path = join(
    cwd(),
    'src',
    'common',
    'database',
    'migrations',
    `${new Date().getTime()}-${name}.sql`,
  );

  writeFileSync(path, `-- Migration: ${name}`);
}
