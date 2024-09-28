import { Module } from '@nestjs/common';

import { AuthModule } from 'src/modules/auth/auth.module';

import { AdminApiService } from './admin-api.service';
import { AdminApiController } from './admin-api.controller';

@Module({
  imports: [AuthModule],
  providers: [AdminApiService],
  controllers: [AdminApiController],
})
export class AdminApiModule {}
