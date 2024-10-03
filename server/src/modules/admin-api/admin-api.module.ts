import { Module } from '@nestjs/common';

import { AuthModule } from 'src/modules/auth/auth.module';
import { JwtModule } from 'src/modules/jwt/jwt.module';
import { EntitiesModule } from 'src/modules/entities/entities.module';

import { AdminApiController } from './admin-api.controller';

@Module({
  imports: [JwtModule, AuthModule, EntitiesModule],
  controllers: [AdminApiController],
})
export class AdminApiModule {}
