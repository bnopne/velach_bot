import { Module } from '@nestjs/common';

import { ConfigurationModule } from 'src/modules/configuration/configuration.module';
import { EntitiesModule } from 'src/modules/entities/entities.module';
import { RandomModule } from 'src/modules/random/random.module';

import { AdminPasscodeService } from './admin-passcode.service';

@Module({
  imports: [ConfigurationModule, EntitiesModule, RandomModule],
  providers: [AdminPasscodeService],
  exports: [AdminPasscodeService],
})
export class AdminPasscodeModule {}
