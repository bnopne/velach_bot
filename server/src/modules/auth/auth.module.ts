import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ConfigurationModule } from 'src/modules/configuration/configuration.module';
import { ConfigurationService } from 'src/modules/configuration/configuration.service';
import { RandomModule } from 'src/modules/random/random.module';
import { InMemoryStorageModule } from 'src/modules/in-memory-storage/in-memory-storage.module';

import { AuthService } from './auth.service';
import { AdminPasscodeService } from './admin-passcode.service';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      useFactory: async (configurationService: ConfigurationService) => ({
        secret: configurationService.jwtSecret,
      }),
      inject: [ConfigurationService],
    }),
    ConfigurationModule,
    RandomModule,
    InMemoryStorageModule,
  ],
  providers: [AuthService, AdminPasscodeService, AuthGuard],
  exports: [AuthService, AdminPasscodeService, AuthGuard],
})
export class AuthModule {}
