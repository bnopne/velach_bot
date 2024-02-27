import { Module } from '@nestjs/common';

import { AuthApiModule } from 'src/modules/admin-api/auth-api/auth-api.module';
import { TemplatesModule } from 'src/modules/telegram-bot/templates/templates.module';
import { MiddlewaresModule } from 'src/modules/telegram-bot/middlewares/middlewares.module';
import { EntitiesModule } from 'src/modules/entities/entities.module';
import { ConfigurationModule } from 'src/modules/configuration/configuration.module';

import { AdminSiteCommandService } from './admin-site-command.service';

@Module({
  imports: [
    AuthApiModule,
    TemplatesModule,
    MiddlewaresModule,
    EntitiesModule,
    ConfigurationModule,
  ],
  providers: [AdminSiteCommandService],
  exports: [AdminSiteCommandService],
})
export class AdminSiteCommandModule {}
