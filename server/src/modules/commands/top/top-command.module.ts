import { Module } from '@nestjs/common';

import { EntitiesModule } from 'src/modules/entities/entities.module';
import { MiddlewaresModule } from 'src/modules/middlewares/middlewares.module';
import { TemplatesModule } from 'src/modules/templates/templates.module';

import { TopCommandService } from './top-command.service';

@Module({
  imports: [EntitiesModule, MiddlewaresModule, TemplatesModule],
  providers: [TopCommandService],
  exports: [TopCommandService],
})
export class TopCommandModule {}
