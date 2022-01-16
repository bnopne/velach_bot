import { Module } from '@nestjs/common';

import { TemplatesModule } from 'src/modules/templates/templates.module';
import { MiddlewaresModule } from 'src/modules/middlewares/middlewares.module';
import { EntitiesModule } from 'src/modules/entities/entities.module';

import { HelpCommandService } from './help-command.service';

@Module({
  imports: [TemplatesModule, MiddlewaresModule, EntitiesModule],
  providers: [HelpCommandService],
  exports: [HelpCommandService],
})
export class HelpCommandModule {}
