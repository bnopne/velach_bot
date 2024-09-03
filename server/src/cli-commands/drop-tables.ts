import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { getConnection, disconnect } from 'src/common/database/connection';
import { ConfigurationService } from 'src/modules/configuration/configuration.service';

export async function dropTables(): Promise<void> {
  const configService = new ConfigurationService();
  const connection = await getConnection(configService.poolConfig);

  const script = readFileSync(
    join(__dirname, 'common/database/drop-tables.sql'),
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
