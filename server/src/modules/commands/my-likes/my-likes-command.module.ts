import { Module } from '@nestjs/common';

import { EntitiesModule } from 'src/modules/entities/entities.module';
import { MiddlewaresModule } from 'src/modules/middlewares/middlewares.module';
import { TemplatesModule } from 'src/modules/templates/templates.module';

import { MyLikesCommandService } from './my-likes-command.service';

@Module({
  imports: [TemplatesModule, MiddlewaresModule, EntitiesModule],
  providers: [MyLikesCommandService],
  exports: [MyLikesCommandService],
})
export class MyLikesCommandModule {}
