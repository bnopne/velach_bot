import { Module } from '@nestjs/common';

import { TemplatesModule } from 'src/modules/templates/templates.module';
import { MiddlewaresModule } from 'src/modules/middlewares/middlewares.module';

import { StartCommandService } from './start-command.service';

@Module({
  imports: [TemplatesModule, MiddlewaresModule],
  providers: [StartCommandService],
  exports: [StartCommandService],
})
export class StartCommandModule {}
