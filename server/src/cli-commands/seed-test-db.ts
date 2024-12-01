import { getConnection, disconnect } from 'src/common/database/connection';
import { seedTestDatabase } from 'src/common/database/test-database';
import { ConfigurationService } from 'src/modules/configuration/configuration.service';

export async function seedTestDb(): Promise<void> {
  const configService = new ConfigurationService();
  const connection = await getConnection(configService.poolConfig);

  try {
    await seedTestDatabase(connection);
  } catch (err) {
    connection.release();
    await disconnect();
    throw err;
  }

  connection.release();
  await disconnect();
}
