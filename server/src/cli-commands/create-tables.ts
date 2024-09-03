import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

import { disconnect, getConnection } from 'src/common/database/connection';
import { ConfigurationService } from 'src/modules/configuration/configuration.service';

export async function createTables(): Promise<void> {
  const configService = new ConfigurationService();
  const connection = await getConnection(configService.poolConfig);

  const script = readFileSync(
    join(dirname(__dirname), 'common/database/create-tables.sql'),
  );

  try {
    await connection.query(script.toString());
  } catch (err) {
    throw err;
  } finally {
    connection.release();
    await disconnect();
  }
}
