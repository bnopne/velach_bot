import { Module } from '@nestjs/common';

import { TemplatesModule } from 'src/modules/telegram-bot/templates/templates.module';
import { MiddlewaresModule } from 'src/modules/telegram-bot/middlewares/middlewares.module';

import { StartCommandService } from './start-command.service';

@Module({
  imports: [TemplatesModule, MiddlewaresModule],
  providers: [StartCommandService],
  exports: [StartCommandService],
})
export class StartCommandModule {}
