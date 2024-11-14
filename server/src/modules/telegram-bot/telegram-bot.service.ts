import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { Telegraf } from 'telegraf';

import { Context } from 'src/common/types/bot';
import { CommandRouterService } from 'src/modules/telegram-bot/command-router/command-router.service';
import { CallbackQueryRouterService } from 'src/modules/telegram-bot/callback-query-router/callback-query-router.service';
import { BikecheckCommandService } from 'src/modules/telegram-bot/commands/bikecheck/bikecheck-command.service';
import { handleError } from 'src/modules/telegram-bot/error-handler';
import { ConfigurationService } from 'src/modules/configuration/configuration.service';

@Injectable()
export class TelegramBotService implements OnModuleInit, OnModuleDestroy {
  private bot: Telegraf;
  private logger: Logger;
  private configurationService: ConfigurationService;
  private commandRouterService: CommandRouterService;
  private callbackQueriesService: CallbackQueryRouterService;
  private bikecheckCommandService: BikecheckCommandService;

  constructor(
    configService: ConfigurationService,
    commandRouterService: CommandRouterService,
    callbackQueriesService: CallbackQueryRouterService,
    bikecheckCommandService: BikecheckCommandService,
  ) {
    this.configurationService = configService;
    this.commandRouterService = commandRouterService;
    this.callbackQueriesService = callbackQueriesService;
    this.bikecheckCommandService = bikecheckCommandService;

    this.logger = new Logger('Telegram Bot Service');

    this.bot = new Telegraf<Context>(
      this.configurationService.telegramBotToken,
    );

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
    this.bot.launch();
  }

  async onModuleDestroy(): Promise<void> {
    this.logger.log('Stop Telegram bot');
    this.bot.stop();
  }
}
