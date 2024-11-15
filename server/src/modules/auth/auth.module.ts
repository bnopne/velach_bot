import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ConfigurationModule } from 'src/modules/configuration/configuration.module';
import { ConfigurationService } from 'src/modules/configuration/configuration.service';
import { AdminPasscodeModule } from 'src/modules/admin-passcode/admin-passcode.module';
import { EntitiesModule } from 'src/modules/entities/entities.module';
import { PgPoolModule } from 'src/modules/pg-pool/pg-pool.module';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    ConfigurationModule,
    AdminPasscodeModule,
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      useFactory: async (configurationService: ConfigurationService) => ({
        secret: configurationService.jwtSecret,
      }),
      inject: [ConfigurationService],
    }),
    EntitiesModule,
    PgPoolModule,
  ],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
