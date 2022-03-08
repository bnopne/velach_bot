import { Module } from '@nestjs/common';

import { EntitiesModule } from 'src/modules/entities/entities.module';
import { MiddlewaresModule } from 'src/modules/middlewares/middlewares.module';
import { TemplatesModule } from 'src/modules/templates/templates.module';

import { OnSaleCommandService } from './on-sale-command.service';

@Module({
  imports: [EntitiesModule, MiddlewaresModule, TemplatesModule],
  providers: [OnSaleCommandService],
  exports: [OnSaleCommandService],
})
export class OnSaleCommandModule {}
