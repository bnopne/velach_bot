import { Module } from '@nestjs/common';

import { TemplatesModule } from 'src/modules/templates/templates.module';
import { MiddlewaresModule } from 'src/modules/middlewares/middlewares.module';
import { EntitiesModule } from 'src/modules/entities/entities.module';

import { CheckbikeCommandService } from './checkbike-command.service';

@Module({
  imports: [TemplatesModule, MiddlewaresModule, EntitiesModule],
  providers: [CheckbikeCommandService],
  exports: [CheckbikeCommandService],
})
export class CheckbikeCommandModule {}
