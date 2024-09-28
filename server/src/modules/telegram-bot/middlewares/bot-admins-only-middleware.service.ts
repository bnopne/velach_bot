import { Injectable } from '@nestjs/common';

import {
  Context,
  type TMiddlewareNext,
  type TMiddleware,
} from 'src/common/types/bot';
import {
  getContextConnectionOrFail,
  getContextMessageOrFail,
  getMessageFromOrFail,
} from 'src/common/utils/telegram-context';
import { BotAdminService } from 'src/modules/entities/bot-admin/bot-admin.service';

@Injectable()
export class BotAdminsOnlyMiddlewareService {
  constructor(private readonly botAdminService: BotAdminService) {}

  private async middleware(ctx: Context, next: TMiddlewareNext) {
    const client = getContextConnectionOrFail(ctx);
    const message = getContextMessageOrFail(ctx);
    const from = getMessageFromOrFail(message);

    const botAdmin = await this.botAdminService.findByUserId(
      client,
      from.id.toString(10),
    );

    if (botAdmin) {
      return next();
    }
  }

  getMiddleware(): TMiddleware {
    return (ctx, next) => this.middleware(ctx, next);
  }
}
