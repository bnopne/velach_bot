import { Module } from '@nestjs/common';

import { AuthModule } from 'src/modules/auth/auth.module';
import { EntitiesModule } from 'src/modules/entities/entities.module';
import { PgPoolModule } from 'src/modules/pg-pool/pg-pool.module';
import { ConfigurationModule } from 'src/modules/configuration/configuration.module';
import { ConfigurationService } from 'src/modules/configuration/configuration.service';

import { AdminApiController } from './admin-api.controller';
import { AdminApiService } from './admin-api.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    EntitiesModule,
    PgPoolModule,
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      useExisting: ConfigurationService,
    }),
    AuthModule,
  ],
  controllers: [AdminApiController],
  providers: [AdminApiService],
})
export class AdminApiModule {}
