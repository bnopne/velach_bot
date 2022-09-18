import { Module } from '@nestjs/common';

import { PgPoolService } from 'src/modules/pg-pool/pg-pool.service';
import { ConfigurationModule } from 'src/modules/configuration/configuration.module';

@Module({
  imports: [ConfigurationModule],
  providers: [PgPoolService],
  exports: [PgPoolService],
})
export class PgPoolModule {}
