import { Telegraf } from 'telegraf';
import { Injectable } from '@nestjs/common';

import { Context } from 'src/common/types/bot';
import { ConfigurationService } from 'src/modules/configuration/configuration.service';

@Injectable()
export class TelegrafInstance {
  readonly bot: Telegraf;

  constructor(private readonly configurationService: ConfigurationService) {
    this.bot = new Telegraf<Context>(
      this.configurationService.telegramBotToken,
    );
  }
}
