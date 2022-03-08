import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PgPoolService } from 'src/modules/pg-pool/pg-pool.service';

@Module({
  imports: [ConfigModule],
  providers: [PgPoolService],
  exports: [PgPoolService],
})
export class PgPoolModule {}
