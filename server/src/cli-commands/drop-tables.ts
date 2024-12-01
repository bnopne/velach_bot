import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { getConnection, disconnect } from 'src/common/database/connection';
import { ConfigurationService } from 'src/modules/configuration/configuration.service';

import { SRC_DIR } from './common';

export async function dropTables(): Promise<void> {
  const configService = new ConfigurationService();
  const connection = await getConnection(configService.poolConfig);

  const script = readFileSync(
    join(SRC_DIR, 'common', 'database', 'drop-tables.sql'),
  );

  try {
    await connection.query(script.toString());
  } catch (err) {
    connection.release();
    await disconnect();
    throw err;
  }

  connection.release();
  await disconnect();
}
