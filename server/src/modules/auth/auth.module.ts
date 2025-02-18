import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AdminPasscodeModule } from 'src/modules/admin-passcode/admin-passcode.module';
import { ConfigurationModule } from 'src/modules/configuration/configuration.module';
import { ConfigurationService } from 'src/modules/configuration/configuration.service';
import { PgPoolModule } from 'src/modules/pg-pool/pg-pool.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    AdminPasscodeModule,
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      useExisting: ConfigurationService,
    }),
    PgPoolModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthGuard],
})
export class AuthModule {}
