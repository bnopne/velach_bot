import { Injectable } from '@nestjs/common';
import { Router } from 'telegraf';

import { RouteFn, Context, Middleware } from 'src/common/types/bot';
import {
  getMessageFromContext,
  getMessageText,
} from 'src/common/utils/context';
import { COMMANDS } from 'src/common/constants';
import { HelpCommandService } from 'src/modules/commands/help/help-command.service';
import { BikecheckCommandService } from 'src/modules/commands/bikecheck/bikecheck-command.service';
import { CheckbikeCommandService } from 'src/modules/commands/checkbike/checkbike-command.service';
import { DeletedCommandService } from 'src/modules/commands/deleted/deleted-command.service';
import { SetStravaCommandService } from 'src/modules/commands/set-strava/set-strava-command.service';
import { StartCommandService } from 'src/modules/commands/start/start-command.service';
import { OnSaleCommandService } from 'src/modules/commands/on-sale/on-sale-command.service';
import { TopCommandService } from 'src/modules/commands/top/top-command.service';
import { MyLikesCommandService } from 'src/modules/commands/my-likes/my-likes-command.service';

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
  private router: Router<Context>;
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
        getMessageText(getMessageFromContext(ctx)) || '',
        ctx.botInfo.username,
      );

      if (!command) {
        return null;
      }

      if (Object.values(COMMANDS).includes(command)) {
        return { route: command };
      }

      return null;
    };

    this.router = new Router(routeFn);

    this.router
      .on(COMMANDS.HELP, this.helpCommandService.getMessageMiddleware())
      .on(
        COMMANDS.BIKECHECK,
        this.bikecheckCommandService.getMessageMiddleware(),
      )
      .on(
        COMMANDS.CHECKBIKE,
        this.checkbikeCommandService.getMessageMiddleware(),
      )
      .on(COMMANDS.DELETED, this.deletedCommandService.getMessageMiddleware())
      .on(COMMANDS.SET_STRAVA, this.setStravaCommandService.getMiddleware())
      .on(COMMANDS.START, this.startCommandService.getMessageMiddleware())
      .on(COMMANDS.ON_SALE, this.onSaleCommandService.getMessageMiddleware())
      .on(COMMANDS.TOP, this.topCommandService.getMessageMiddleware())
      .on(COMMANDS.MY_LIKES, this.myLikesCommandService.getMessageMiddleware())
      .otherwise((command, next) => {
        next();
      });
  }

  getMiddleware(): Middleware {
    return this.router.middleware();
  }
}
