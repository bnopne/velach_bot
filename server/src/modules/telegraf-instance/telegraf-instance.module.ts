import { Module } from '@nestjs/common';

import { ConfigurationModule } from 'src/modules/configuration/configuration.module';

import { TelegrafInstance } from './telegraf-instance';

@Module({
  imports: [ConfigurationModule],
  providers: [TelegrafInstance],
  exports: [TelegrafInstance],
})
export class TelegrafInstanceModule {}
