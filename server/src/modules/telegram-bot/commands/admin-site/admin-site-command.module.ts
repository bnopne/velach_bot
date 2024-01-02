import { Module } from '@nestjs/common';

import { AuthModule } from 'src/modules/auth/auth.module';
import { TemplatesModule } from 'src/modules/telegram-bot/templates/templates.module';
import { MiddlewaresModule } from 'src/modules/telegram-bot/middlewares/middlewares.module';
import { EntitiesModule } from 'src/modules/entities/entities.module';
import { ConfigurationModule } from 'src/modules/configuration/configuration.module';

import { AdminSiteCommandService } from './admin-site-command.service';

@Module({
  imports: [
    AuthModule,
    TemplatesModule,
    MiddlewaresModule,
    EntitiesModule,
    ConfigurationModule,
  ],
  providers: [AdminSiteCommandService],
  exports: [AdminSiteCommandService],
})
export class AdminSiteCommandModule {}
