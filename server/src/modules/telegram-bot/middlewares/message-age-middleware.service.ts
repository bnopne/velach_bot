import { Injectable } from '@nestjs/common';
import { differenceInSeconds, fromUnixTime } from 'date-fns';

import { Context, TMiddleware, TMiddlewareNext } from 'src/common/types/bot';
import { ConfigurationService } from 'src/modules/configuration/configuration.service';

@Injectable()
export class MessageAgeMiddlewareService {
  constructor(private configurationService: ConfigurationService) {}

  private async middleware(ctx: Context, next: TMiddlewareNext): Promise<void> {
    const now = new Date();
    let updateDate: Date;

    if (ctx.message) {
      updateDate = fromUnixTime(ctx.message.date);
    } else {
      updateDate = new Date();
    }

    if (
      differenceInSeconds(now, updateDate) <=
      this.configurationService.maxMessageAge
    ) {
      return next();
    }
  }

  getMiddleware(): TMiddleware {
    return this.middleware.bind(this);
  }
}
