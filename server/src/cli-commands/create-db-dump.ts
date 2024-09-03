import { join } from 'node:path';
import { execSync } from 'node:child_process';

import { format } from 'date-fns';

import { ConfigurationService } from 'src/modules/configuration/configuration.service';

export async function createDbDump(
  dir: string,
  filename?: string,
): Promise<void> {
  const configService = new ConfigurationService();

  const dumpFilename = filename
    ? `${filename}.sql`
    : `velach_bot_db_${format(new Date(), 'dd-MM-yyyy_HH-mm-ss')}.sql`;

  const dumpPath = join(dir, dumpFilename);

  execSync(`pg_dump ${configService.poolConfig.database} > ${dumpPath}`, {
    env: {
      PGHOST: configService.poolConfig.host,
      PGPORT: configService.poolConfig.port?.toString(),
      PGUSER: configService.poolConfig.user,
      PGPASSWORD: configService.poolConfig.password?.toString(),
    },
  });
}
