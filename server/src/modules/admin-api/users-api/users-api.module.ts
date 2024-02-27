import { Module } from '@nestjs/common';

import { EntitiesModule } from 'src/modules/entities/entities.module';
import { PgPoolModule } from 'src/modules/pg-pool/pg-pool.module';
import { ConfigurationModule } from 'src/modules/configuration/configuration.module';

import { UsersApiController } from './users-api.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigurationService } from 'src/modules/configuration/configuration.service';

@Module({
  imports: [
    ConfigurationModule,
    EntitiesModule,
    PgPoolModule,
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      useFactory: async (configService: ConfigurationService) => ({
        secret: configService.JWTSecret,
      }),
      inject: [ConfigurationService],
    }),
  ],
  controllers: [UsersApiController],
})
export class UsersApiModule {}
