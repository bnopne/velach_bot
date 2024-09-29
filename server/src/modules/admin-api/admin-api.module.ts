import { Module } from '@nestjs/common';

import { AuthModule } from 'src/modules/auth/auth.module';

import { AdminApiController } from './admin-api.controller';

@Module({
  imports: [AuthModule],
  controllers: [AdminApiController],
})
export class AdminApiModule {}
