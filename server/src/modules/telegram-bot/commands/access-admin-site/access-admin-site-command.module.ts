import { Module } from '@nestjs/common';

import { EntitiesModule } from 'src/modules/entities/entities.module';
import { MiddlewaresModule } from 'src/modules/telegram-bot/middlewares/middlewares.module';
import { TemplatesModule } from 'src/modules/telegram-bot/templates/templates.module';
import { AdminSiteAuthModule } from 'src/modules/admin-site-auth/admin-site-auth.module';
import { ConfigurationModule } from 'src/modules/configuration/configuration.module';
import { RandomModule } from 'src/modules/random/random.module';

import { AccessAdminSiteCommandService } from './access-admin-site-command.service';

@Module({
  imports: [
    TemplatesModule,
    MiddlewaresModule,
    EntitiesModule,
    ConfigurationModule,
    RandomModule,
    AdminSiteAuthModule,
  ],
  providers: [AccessAdminSiteCommandService],
  exports: [AccessAdminSiteCommandService],
})
export class AccessAdminSiteCommandModule {}
