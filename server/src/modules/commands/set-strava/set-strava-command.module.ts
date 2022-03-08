import { Module } from '@nestjs/common';

import { TemplatesModule } from 'src/modules/templates/templates.module';
import { MiddlewaresModule } from 'src/modules/middlewares/middlewares.module';
import { EntitiesModule } from 'src/modules/entities/entities.module';

import { SetStravaCommandService } from './set-strava-command.service';

@Module({
  imports: [TemplatesModule, MiddlewaresModule, EntitiesModule],
  providers: [SetStravaCommandService],
  exports: [SetStravaCommandService],
})
export class SetStravaCommandModule {}
