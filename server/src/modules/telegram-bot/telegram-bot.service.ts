import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Telegraf } from 'telegraf';

import { Context } from 'src/common/types/bot';
import { CommandRouterService } from 'src/modules/command-router/command-router.service';
import { CallbackQueryRouterService } from 'src/modules/callback-query-router/callback-query-router.service';
import { BikecheckCommandService } from 'src/modules/commands/bikecheck/bikecheck-command.service';
import { handleError } from 'src/modules/telegram-bot/error-handler';

@Injectable()
export class TelegramBotService implements OnModuleInit, OnModuleDestroy {
  private bot: Telegraf;
  private logger: Logger;
  private configService: ConfigService;
  private commandRouterService: CommandRouterService;
  private callbackQueriesService: CallbackQueryRouterService;
  private bikecheckCommandService: BikecheckCommandService;

  constructor(
    configService: ConfigService,
    commandRouterService: CommandRouterService,
    callbackQueriesService: CallbackQueryRouterService,
    bikecheckCommandService: BikecheckCommandService,
  ) {
    this.configService = configService;
    this.commandRouterService = commandRouterService;
    this.callbackQueriesService = callbackQueriesService;
    this.bikecheckCommandService = bikecheckCommandService;

    this.logger = new Logger('Telegram Bot Service');

    const token = this.configService.get<string>('VELACH_BOT_TELEGRAM_TOKEN');

    if (!token) {
      throw new Error('No telegram token configured');
    }

    this.bot = new Telegraf<Context>(token);

    this.bot
      .on('message', this.commandRouterService.getMiddleware())
      .on('callback_query', this.callbackQueriesService.getMiddleware())
      .on(
        'inline_query',
        this.bikecheckCommandService.getInlineQueryMiddleware(),
      )
      .catch(handleError);
  }

  async onModuleInit(): Promise<void> {
    this.logger.log('Starting Telegram bot');
    await this.bot.launch();
  }

  async onModuleDestroy(): Promise<void> {
    this.logger.log('Stop Telegram bot');
    this.bot.stop();
  }
}
