import { Injectable } from '@nestjs/common';

import { Context, TMiddleware, MiddlewareNext } from 'src/common/types/bot';

@Injectable()
export class PrivateChatsOnlyMiddlewareService {
  getMiddleware(): TMiddleware {
    return this.middleware.bind(this);
  }

  private async middleware(
    context: Context,
    next: MiddlewareNext,
  ): Promise<void> {
    const chat = context.chat;

    if (!chat) {
      return next();
    }

    if (chat.type === 'private') {
      return next();
    }
  }
}
