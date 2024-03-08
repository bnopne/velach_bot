import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigurationModule } from 'src/modules/configuration/configuration.module';
import { ConfigurationService } from 'src/modules/configuration/configuration.service';
import { EntitiesModule } from 'src/modules/entities/entities.module';
import { PgPoolModule } from 'src/modules/pg-pool/pg-pool.module';

import { StatsApiController } from './stats-api.controller';

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
  controllers: [StatsApiController],
})
export class StatsApiModule {}
