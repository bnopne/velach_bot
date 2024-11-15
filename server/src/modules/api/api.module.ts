import { Module } from '@nestjs/common';

import { AuthModule } from 'src/modules/auth/auth.module';
import { PgPoolModule } from 'src/modules/pg-pool/pg-pool.module';
import { EntitiesModule } from 'src/modules/entities/entities.module';

import { AuthController } from './auth/auth.controller';

@Module({
  imports: [AuthModule, PgPoolModule, EntitiesModule],
  controllers: [AuthController],
})
export class ApiModule {}
