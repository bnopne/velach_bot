import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, parse } from 'node:path';

import { getConnection, disconnect } from 'src/common/database/connection';
import { MigrationService } from 'src/modules/entities/migration/migration.service';
import { ConfigurationService } from 'src/modules/configuration/configuration.service';

import { SRC_DIR } from './common';

export async function applyMigrations(): Promise<void> {
  const migrationsDir = join(SRC_DIR, 'common', 'database', 'migrations');

  const migrationFiles = existsSync(migrationsDir)
    ? readdirSync(migrationsDir, { withFileTypes: true })
        .filter((e) => e.isFile)
        .filter((e) => e.name.endsWith('.sql'))
        .map((e) => join(migrationsDir, e.name))
    : [];

  if (!migrationFiles.length) {
    console.warn('No migrations found, exit...');
    return;
  }

  const configService = new ConfigurationService();
  const client = await getConnection(configService.poolConfig);
  const migrationService = new MigrationService();

  const appliedMigrations = (await migrationService.getAll(client)).map(
    (m) => m.name,
  );
  const pendingMigrations = migrationFiles.filter(
    (m) => !appliedMigrations.includes(parse(m).name),
  );

  if (pendingMigrations.length === 0) {
    console.warn('No pending migrations found, skip...');
  }

  await client.query('START TRANSACTION');

  try {
    for (const file of pendingMigrations) {
      const migrationName = parse(file).name;
      console.log(`Applying migration ${migrationName}`);

      const existingMigration = await migrationService.findByName(
        client,
        migrationName,
      );
      if (existingMigration) {
        console.warn(`Migration ${migrationName} already applied, skip...`);
        continue;
      }
      await client.query(readFileSync(file).toString());
      await migrationService.create(client, migrationName);
    }

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(`Failed to apply migrations, rollback`);
    throw err;
  } finally {
    client.release();
    await disconnect();
  }
}
