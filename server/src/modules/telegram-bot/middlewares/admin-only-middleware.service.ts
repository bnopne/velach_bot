import { Injectable } from '@nestjs/common';

import { Context, Middleware, MiddlewareNext } from 'src/common/types/bot';
import {
  getContextMessage,
  getMessageFrom,
} from 'src/common/utils/telegram-context';
import { getContextConnectionOrFail } from 'src/common/utils/telegram-context';
import { AdminSiteAccessService } from 'src/modules/entities/admin-site-access/admin-site-access.service';

@Injectable()
export class AdminOnlyMiddlewareService {
  constructor(private adminSiteAccessService: AdminSiteAccessService) {}

  private async middleware(
    context: Context,
    next: MiddlewareNext,
  ): Promise<void> {
    const message = getContextMessage(context);
    const client = getContextConnectionOrFail(context);

    if (!message) {
      return;
    }

    const from = getMessageFrom(message);

    if (!from) {
      return;
    }

    const accessRecord = await this.adminSiteAccessService.findByUserId(
      client,
      from.id.toString(),
    );

    if (!accessRecord) {
      return;
    }

    next();
  }

  getMiddleware(): Middleware {
    return this.middleware.bind(this);
  }
}
