import { Module } from '@nestjs/common';

import { ConfigurationService } from 'src/modules/configuration/configuration.service';

@Module({
  providers: [ConfigurationService],
  exports: [ConfigurationService],
})
export class ConfigurationModule {}
