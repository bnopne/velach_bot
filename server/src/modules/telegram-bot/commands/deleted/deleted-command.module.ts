import { Module } from '@nestjs/common';

import { EntitiesModule } from 'src/modules/entities/entities.module';
import { MiddlewaresModule } from 'src/modules/telegram-bot/middlewares/middlewares.module';
import { TemplatesModule } from 'src/modules/telegram-bot/templates/templates.module';

import { DeletedCommandService } from './deleted-command.service';

@Module({
  imports: [EntitiesModule, TemplatesModule, MiddlewaresModule],
  providers: [DeletedCommandService],
  exports: [DeletedCommandService],
})
export class DeletedCommandModule {}
