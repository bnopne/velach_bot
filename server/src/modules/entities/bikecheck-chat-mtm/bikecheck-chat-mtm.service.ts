import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import { BikecheckChatMtm } from './bikecheck-chat-mtm.entity';
import { find } from './queries';

@Injectable()
export class BikecheckChatMtmService {
  async find(
    client: PoolClient,
    bikecheckId: string,
    chatId: string,
  ): Promise<BikecheckChatMtm | null> {
    const rows = await find.run({ chatId, bikecheckId }, client);

    if (!rows.length) {
      return null;
    }

    return BikecheckChatMtm.fromTableRow(rows[0]);
  }

  async get(
    client: PoolClient,
    userId: string,
    chatId: string,
  ): Promise<BikecheckChatMtm> {
    const chat = await this.find(client, chatId, userId);

    if (!chat) {
      throw new Error(
        `UserChatMtm with userId ${userId} and chatId ${chatId} not found`,
      );
    }

    return chat;
  }
}
