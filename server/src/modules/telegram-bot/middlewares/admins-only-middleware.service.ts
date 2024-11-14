import { Injectable } from '@nestjs/common';

import { AdminService } from 'src/modules/entities/admin/admin.service';
import { Context, Middleware, MiddlewareNext } from 'src/common/types/bot';
import {
  getContextConnectionOrFail,
  getContextMessageOrFail,
  getMessageFromOrFail,
} from 'src/common/utils/telegram-context';

@Injectable()
export class AdminsOnlyMiddlewareService {
  constructor(private readonly adminService: AdminService) {}

  getMiddleware(): Middleware {
    return this.middleware.bind(this);
  }

  private async middleware(
    context: Context,
    next: MiddlewareNext,
  ): Promise<void> {
    const client = getContextConnectionOrFail(context);
    const message = getContextMessageOrFail(context);
    const from = getMessageFromOrFail(message);

    const admin = await this.adminService.findUserById(
      client,
      from.id.toString(10),
    );

    if (admin) {
      return next();
    }
  }
}
