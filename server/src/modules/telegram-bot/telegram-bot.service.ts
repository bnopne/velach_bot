import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';

import { CommandRouterService } from 'src/modules/telegram-bot/command-router/command-router.service';
import { CallbackQueryRouterService } from 'src/modules/telegram-bot/callback-query-router/callback-query-router.service';
import { BikecheckCommandService } from 'src/modules/telegram-bot/commands/bikecheck/bikecheck-command.service';
import { handleError } from 'src/modules/telegram-bot/error-handler';
import { TelegrafInstance } from 'src/modules/telegraf-instance/telegraf-instance';

const logger = new Logger('Telegram Bot Service');

@Injectable()
export class TelegramBotService implements OnModuleInit, OnModuleDestroy {
  private readonly telegrafInstance: TelegrafInstance;
  private readonly commandRouterService: CommandRouterService;
  private readonly callbackQueriesService: CallbackQueryRouterService;
  private readonly bikecheckCommandService: BikecheckCommandService;

  constructor(
    telegrafInstance: TelegrafInstance,
    commandRouterService: CommandRouterService,
    callbackQueriesService: CallbackQueryRouterService,
    bikecheckCommandService: BikecheckCommandService,
  ) {
    this.telegrafInstance = telegrafInstance;
    this.commandRouterService = commandRouterService;
    this.callbackQueriesService = callbackQueriesService;
    this.bikecheckCommandService = bikecheckCommandService;

    this.telegrafInstance.bot
      .on('message', this.commandRouterService.getMiddleware())
      .on('callback_query', this.callbackQueriesService.getMiddleware())
      .on(
        'inline_query',
        this.bikecheckCommandService.getInlineQueryMiddleware(),
      )
      .catch(handleError);
  }

  onModuleInit(): void {
    logger.log('Start Telegram bot');
    this.telegrafInstance.bot.launch();
  }

  onModuleDestroy(): void {
    logger.log('Stop Telegram bot');
    this.telegrafInstance.bot.stop();
  }
}
