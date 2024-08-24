import { Injectable } from '@nestjs/common';
import { Composer } from 'telegraf';

import { RouteFn, Context, Middleware } from 'src/common/types/bot';
import {
  getContextMessageOrFail,
  getMessageText,
} from 'src/common/utils/telegram-context';
import { COMMANDS } from 'src/common/constants';
import { HelpCommandService } from 'src/modules/telegram-bot/commands/help/help-command.service';
import { BikecheckCommandService } from 'src/modules/telegram-bot/commands/bikecheck/bikecheck-command.service';
import { CheckbikeCommandService } from 'src/modules/telegram-bot/commands/checkbike/checkbike-command.service';
import { DeletedCommandService } from 'src/modules/telegram-bot/commands/deleted/deleted-command.service';
import { SetStravaCommandService } from 'src/modules/telegram-bot/commands/set-strava/set-strava-command.service';
import { StartCommandService } from 'src/modules/telegram-bot/commands/start/start-command.service';
import { OnSaleCommandService } from 'src/modules/telegram-bot/commands/on-sale/on-sale-command.service';
import { TopCommandService } from 'src/modules/telegram-bot/commands/top/top-command.service';
import { MyLikesCommandService } from 'src/modules/telegram-bot/commands/my-likes/my-likes-command.service';

function parseCommand(text: string, botUsername: string): string | null {
  const regexp = new RegExp(`^\/([A-Za-z]+)(?:@${botUsername})?$`);
  const match = regexp.exec(text);

  if (!match) {
    return null;
  }

  return match[1];
}

@Injectable()
export class CommandRouterService {
  private middleware: Middleware;
  private helpCommandService: HelpCommandService;
  private bikecheckCommandService: BikecheckCommandService;
  private checkbikeCommandService: CheckbikeCommandService;
  private deletedCommandService: DeletedCommandService;
  private setStravaCommandService: SetStravaCommandService;
  private startCommandService: StartCommandService;
  private onSaleCommandService: OnSaleCommandService;
  private topCommandService: TopCommandService;
  private myLikesCommandService: MyLikesCommandService;

  constructor(
    helpCommandService: HelpCommandService,
    bikecheckCommandService: BikecheckCommandService,
    checkbikeCommandService: CheckbikeCommandService,
    deletedCommandService: DeletedCommandService,
    setStravaCommandService: SetStravaCommandService,
    startCommandService: StartCommandService,
    onSaleCommandService: OnSaleCommandService,
    topCommandService: TopCommandService,
    myLikesCommandService: MyLikesCommandService,
  ) {
    this.helpCommandService = helpCommandService;
    this.bikecheckCommandService = bikecheckCommandService;
    this.checkbikeCommandService = checkbikeCommandService;
    this.deletedCommandService = deletedCommandService;
    this.setStravaCommandService = setStravaCommandService;
    this.startCommandService = startCommandService;
    this.onSaleCommandService = onSaleCommandService;
    this.topCommandService = topCommandService;
    this.myLikesCommandService = myLikesCommandService;

    const routeFn: RouteFn = (ctx) => {
      const command = parseCommand(
        getMessageText(getContextMessageOrFail(ctx)) || '',
        ctx.botInfo.username,
      );

      if (!command) {
        return -1;
      }

      if (Object.values(COMMANDS).includes(command)) {
        return command;
      }

      return -1;
    };

    this.middleware = Composer.dispatch<
      Context,
      Record<string | number, Middleware>
    >(routeFn, {
      [COMMANDS.HELP]: this.helpCommandService.getMessageMiddleware(),
      [COMMANDS.BIKECHECK]: this.bikecheckCommandService.getMessageMiddleware(),
      [COMMANDS.CHECKBIKE]: this.checkbikeCommandService.getMessageMiddleware(),
      [COMMANDS.DELETED]: this.deletedCommandService.getMessageMiddleware(),
      [COMMANDS.SET_STRAVA]: this.setStravaCommandService.getMiddleware(),
      [COMMANDS.START]: this.startCommandService.getMessageMiddleware(),
      [COMMANDS.ON_SALE]: this.onSaleCommandService.getMessageMiddleware(),
      [COMMANDS.TOP]: this.topCommandService.getMessageMiddleware(),
      [COMMANDS.MY_LIKES]: this.myLikesCommandService.getMessageMiddleware(),
      [-1]: (context, next) => {
        next();
      },
    });
  }

  getMiddleware(): Middleware {
    return this.middleware;
  }
}
