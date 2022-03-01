import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { differenceInSeconds, fromUnixTime } from 'date-fns';

import { Context, Middleware, MiddlewareNext } from 'src/common/types/bot';

@Injectable()
export class MessageAgeMiddlewareService {
  constructor(private configService: ConfigService) {}

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
      this.configService.get<number>('VELACH_BOT_MAX_MESSAGE_AGE', 60)
    ) {
      return next();
    }
  }

  getMiddleware(): Middleware {
    return this.middleware.bind(this);
  }
}
