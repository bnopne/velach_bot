import { Injectable } from '@nestjs/common';
import { Context, MiddlewareNext } from 'src/common/types/bot';

import { BotAdminService } from 'src/modules/entities/bot-admin/bot-admin.service';

@Injectable()
export class BotAdminsOnlyMiddlewareService {
  constructor(private readonly botAdminService: BotAdminService) {}

  private async middleware(
    ctx: Context,
    next: MiddlewareNext,
    feature: string,
  ) {}
}
