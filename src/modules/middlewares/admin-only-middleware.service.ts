import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Context, Middleware, MiddlewareNext } from 'src/common/types/bot';
import { getContextMessage, getMessageFrom } from 'src/common/utils/context';

@Injectable()
export class AdminOnlyMiddlewareService {
  constructor(private configService: ConfigService) {}

  private async middleware(ctx: Context, next: MiddlewareNext): Promise<void> {
    const adminId = this.configService.get<string>('VELACH_BOT_ADMIN_ID');

    if (!adminId) {
      return;
    }

    const message = getContextMessage(ctx);

    if (!message) {
      return;
    }

    const from = getMessageFrom(message);

    if (!from) {
      return;
    }

    if (from.id.toString() !== adminId) {
      return;
    }

    next();
  }

  getMiddleware(): Middleware {
    return this.middleware.bind(this);
  }
}
