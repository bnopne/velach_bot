import { Module } from '@nestjs/common';

import { ConfigurationModule } from 'src/modules/configuration/configuration.module';
import { RandomModule } from 'src/modules/random/random.module';
import { InMemoryStorageModule } from 'src/modules/in-memory-storage/in-memory-storage.module';
import { JwtModule } from 'src/modules/jwt/jwt.module';

import { AuthService } from './auth.service';
import { AdminPasscodeService } from './admin-passcode.service';

@Module({
  imports: [
    JwtModule,
    ConfigurationModule,
    RandomModule,
    InMemoryStorageModule,
  ],
  providers: [AuthService, AdminPasscodeService],
  exports: [AuthService, AdminPasscodeService],
})
export class AuthModule {}
