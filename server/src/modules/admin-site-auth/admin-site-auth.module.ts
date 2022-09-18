import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { InMemoryStorageModule } from 'src/modules/in-memory-storage/in-memory-storage.module';
import { ConfigurationModule } from 'src/modules/configuration/configuration.module';
import { EntitiesModule } from 'src/modules/entities/entities.module';
import { AdminSiteAuthService } from 'src/modules/admin-site-auth/admin-site-auth.service';
import { ConfigurationService } from 'src/modules/configuration/configuration.service';
import { PgPoolModule } from 'src/modules/pg-pool/pg-pool.module';

import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      useFactory: async (configService: ConfigurationService) => ({
        secret: configService.jwtSecret,
      }),
      inject: [ConfigurationService],
    }),
    InMemoryStorageModule,
    ConfigurationModule,
    EntitiesModule,
    PgPoolModule,
  ],
  providers: [AdminSiteAuthService, JwtStrategy],
  exports: [AdminSiteAuthService],
})
export class AdminSiteAuthModule {}
