import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { EntitiesModule } from 'src/modules/entities/entities.module';
import { PgPoolModule } from 'src/modules/pg-pool/pg-pool.module';
import { RandomModule } from 'src/modules/random/random.module';
import { InMemoryStorageModule } from 'src/modules/in-memory-storage/in-memory-storage.module';
import { ConfigurationModule } from 'src/modules/configuration/configuration.module';
import { ConfigurationService } from 'src/modules/configuration/configuration.service';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    ConfigurationModule,
    EntitiesModule,
    PgPoolModule,
    RandomModule,
    InMemoryStorageModule,
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      useFactory: async (configService: ConfigurationService) => ({
        secret: configService.JWTSecret,
      }),
      inject: [ConfigurationService],
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
