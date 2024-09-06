import { Injectable, Logger } from '@nestjs/common';
import { Composer } from 'telegraf';
import { CallbackQuery } from '@telegraf/types';

import {
  RouteFn,
  Context,
  Middleware,
  IBaseCallbackQueryData,
} from 'src/common/types/bot';
import {
  getContextCallbackQueryOrFail,
  getCallbackQueryDataOrFail,
} from 'src/common/utils/telegram-context';
import { CALLBACK_QUERY_COMMANDS } from 'src/common/constants';
import { parseCallbackData } from 'src/common/utils/telegram-keyboard';
import { BikecheckCommandService } from 'src/modules/telegram-bot/commands/bikecheck/bikecheck-command.service';
import { DeletedCommandService } from 'src/modules/telegram-bot/commands/deleted/deleted-command.service';
import { OnSaleCommandService } from 'src/modules/telegram-bot/commands/on-sale/on-sale-command.service';
import { TopCommandService } from 'src/modules/telegram-bot/commands/top/top-command.service';
import { MyLikesCommandService } from 'src/modules/telegram-bot/commands/my-likes/my-likes-command.service';

const logger = new Logger('Callback Queries Service');

@Injectable()
export class CallbackQueryRouterService {
  private middleware: Middleware;
  private bikecheckCommandService: BikecheckCommandService;
  private deletedCommandService: DeletedCommandService;
  private onSaleCommandService: OnSaleCommandService;
  private topCommandService: TopCommandService;
  private myLikesCommandService: MyLikesCommandService;

  constructor(
    bikecheckCommandService: BikecheckCommandService,
    deletedCommandService: DeletedCommandService,
    onSaleCommandService: OnSaleCommandService,
    topCommandService: TopCommandService,
    myLikesCommandService: MyLikesCommandService,
  ) {
    this.bikecheckCommandService = bikecheckCommandService;
    this.deletedCommandService = deletedCommandService;
    this.onSaleCommandService = onSaleCommandService;
    this.topCommandService = topCommandService;
    this.myLikesCommandService = myLikesCommandService;

    const routeFn: RouteFn = (ctx) => {
      let callbackQuery: CallbackQuery;

      try {
        callbackQuery = getContextCallbackQueryOrFail(ctx);
      } catch (err) {
        logger.error('No callback query found in context');
        return -1;
      }

      let data: IBaseCallbackQueryData;

      try {
        data = parseCallbackData<IBaseCallbackQueryData>(
          getCallbackQueryDataOrFail(callbackQuery),
        );
      } catch (err) {
        logger.error('Could not parse callback query data');
        return -1;
      }

      if (Object.values(CALLBACK_QUERY_COMMANDS).includes(data.c.toString())) {
        return data.c.toString();
      }

      return -1;
    };

    this.middleware = Composer.dispatch<
      Context,
      Record<string | number, Middleware>
    >(routeFn, {
      [CALLBACK_QUERY_COMMANDS.SHOW_NEXT_BIKECHECK]:
        this.bikecheckCommandService.getCallbackQueryMiddleware(
          CALLBACK_QUERY_COMMANDS.SHOW_NEXT_BIKECHECK,
        ),
      [CALLBACK_QUERY_COMMANDS.SHOW_PREVIOUS_BIKECHECK]:
        this.bikecheckCommandService.getCallbackQueryMiddleware(
          CALLBACK_QUERY_COMMANDS.SHOW_PREVIOUS_BIKECHECK,
        ),
      [CALLBACK_QUERY_COMMANDS.DELETE_BIKECHECK]:
        this.bikecheckCommandService.getCallbackQueryMiddleware(
          CALLBACK_QUERY_COMMANDS.DELETE_BIKECHECK,
        ),
      [CALLBACK_QUERY_COMMANDS.DELETE_STRAVA]:
        this.bikecheckCommandService.getCallbackQueryMiddleware(
          CALLBACK_QUERY_COMMANDS.DELETE_STRAVA,
        ),
      [CALLBACK_QUERY_COMMANDS.TOGGLE_ON_SALE]:
        this.bikecheckCommandService.getCallbackQueryMiddleware(
          CALLBACK_QUERY_COMMANDS.TOGGLE_ON_SALE,
        ),
      [CALLBACK_QUERY_COMMANDS.LIKE]:
        this.bikecheckCommandService.getCallbackQueryMiddleware(
          CALLBACK_QUERY_COMMANDS.LIKE,
        ),
      [CALLBACK_QUERY_COMMANDS.DISLIKE]:
        this.bikecheckCommandService.getCallbackQueryMiddleware(
          CALLBACK_QUERY_COMMANDS.DISLIKE,
        ),
      [CALLBACK_QUERY_COMMANDS.SHOW_NEXT_DELETED_BIKECHECK]:
        this.deletedCommandService.getCallbackQueryMiddleware(
          CALLBACK_QUERY_COMMANDS.SHOW_NEXT_DELETED_BIKECHECK,
        ),
      [CALLBACK_QUERY_COMMANDS.SHOW_PREVIOUS_DELETED_BIKECHECK]:
        this.deletedCommandService.getCallbackQueryMiddleware(
          CALLBACK_QUERY_COMMANDS.SHOW_PREVIOUS_DELETED_BIKECHECK,
        ),
      [CALLBACK_QUERY_COMMANDS.RESTORE_BIKECHECK]:
        this.deletedCommandService.getCallbackQueryMiddleware(
          CALLBACK_QUERY_COMMANDS.RESTORE_BIKECHECK,
        ),
      [CALLBACK_QUERY_COMMANDS.SHOW_NEXT_ON_SALE_BIKECHECK]:
        this.onSaleCommandService.getCallbackQueryMiddleware(
          CALLBACK_QUERY_COMMANDS.SHOW_NEXT_ON_SALE_BIKECHECK,
        ),
      [CALLBACK_QUERY_COMMANDS.SHOW_PREVIOUS_ON_SALE_BIKECHECK]:
        this.onSaleCommandService.getCallbackQueryMiddleware(
          CALLBACK_QUERY_COMMANDS.SHOW_PREVIOUS_ON_SALE_BIKECHECK,
        ),
      [CALLBACK_QUERY_COMMANDS.SHOW_TOP_BIKECHECK]:
        this.topCommandService.getCallbackQueryMiddleware(),
      [CALLBACK_QUERY_COMMANDS.SHOW_PREVIOUS_LIKED_BIKECHECK]:
        this.myLikesCommandService.getCallbackQueryMiddleware(
          CALLBACK_QUERY_COMMANDS.SHOW_PREVIOUS_LIKED_BIKECHECK,
        ),
      [CALLBACK_QUERY_COMMANDS.SHOW_NEXT_LIKED_BIKECHECK]:
        this.myLikesCommandService.getCallbackQueryMiddleware(
          CALLBACK_QUERY_COMMANDS.SHOW_NEXT_LIKED_BIKECHECK,
        ),
      [-1]: (_, next) => {
        next();
      },
    });
  }

  getMiddleware(): Middleware {
    return this.middleware;
  }
}
