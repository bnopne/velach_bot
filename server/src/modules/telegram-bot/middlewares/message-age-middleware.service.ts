import { Injectable } from '@nestjs/common';
import { differenceInSeconds, fromUnixTime } from 'date-fns';

import { Context, Middleware, MiddlewareNext } from 'src/common/types/bot';
import { ConfigurationService } from 'src/modules/configuration/configuration.service';

@Injectable()
export class MessageAgeMiddlewareService {
  constructor(private configurationService: ConfigurationService) {}

  private async middleware(ctx: Context, next: MiddlewareNext): Promise<void> {
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

  getMiddleware(): Middleware {
    return this.middleware.bind(this);
  }
}
