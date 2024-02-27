import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { EntitiesModule } from 'src/modules/entities/entities.module';
import { PgPoolModule } from 'src/modules/pg-pool/pg-pool.module';
import { ConfigurationModule } from 'src/modules/configuration/configuration.module';
import { ConfigurationService } from 'src/modules/configuration/configuration.service';

import { BikechecksApiController } from './bikechecks-api.controller';

@Module({
  imports: [
    ConfigurationModule,
    PgPoolModule,
    EntitiesModule,
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      useFactory: async (configService: ConfigurationService) => ({
        secret: configService.JWTSecret,
      }),
      inject: [ConfigurationService],
    }),
  ],
  controllers: [BikechecksApiController],
})
export class BikechecksApiModule {}
