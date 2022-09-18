import { Module } from '@nestjs/common';

import { TemplatesService } from 'src/modules/telegram-bot/templates/templates.service';

@Module({
  providers: [TemplatesService],
  exports: [TemplatesService],
})
export class TemplatesModule {}
