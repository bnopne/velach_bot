import { Module } from '@nestjs/common';

import { ConfigurationModule } from 'src/modules/configuration/configuration.module';
import { EntitiesModule } from 'src/modules/entities/entities.module';
import { MiddlewaresModule } from 'src/modules/telegram-bot/middlewares/middlewares.module';
import { TemplatesModule } from 'src/modules/telegram-bot/templates/templates.module';
import { InMemoryStorageModule } from 'src/modules/in-memory-storage/in-memory-storage.module';
import { RandomModule } from 'src/modules/random/random.module';

import { GetAdminPasscodeService } from './get-admin-passcode.service';

@Module({
  imports: [
    ConfigurationModule,
    TemplatesModule,
    MiddlewaresModule,
    EntitiesModule,
    InMemoryStorageModule,
    RandomModule,
  ],
  providers: [GetAdminPasscodeService],
  exports: [GetAdminPasscodeService],
})
export class GetAdminPasscodeModule {}
