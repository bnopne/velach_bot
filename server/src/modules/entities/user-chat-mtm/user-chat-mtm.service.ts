import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import { UserChatMtm } from './user-chat-mtm.entity';
import { find, insert } from './queries';

@Injectable()
export class UserChatMtmService {
  async find(
    client: PoolClient,
    userId: string,
    chatId: string,
  ): Promise<UserChatMtm | null> {
    const rows = await find.run({ chatId, userId }, client);

    if (!rows.length) {
      return null;
    }

    return UserChatMtm.fromTableRow(rows[0]);
  }

  async get(
    client: PoolClient,
    userId: string,
    chatId: string,
  ): Promise<UserChatMtm> {
    const chat = await this.find(client, userId, chatId);

    if (!chat) {
      throw new Error(
        `UserChatMtm with userId ${userId} and chatId ${chatId} not found`,
      );
    }

    return chat;
  }

  async create(
    client: PoolClient,
    userId: string,
    chatId: string,
  ): Promise<UserChatMtm> {
    const rows = await insert.run({ userChatMtm: { userId, chatId } }, client);
    return UserChatMtm.fromTableRow(rows[0]);
  }

  async createIfNotExists(
    client: PoolClient,
    userId: string,
    chatId: string,
  ): Promise<UserChatMtm> {
    const existingEntity = await this.find(client, userId, chatId);

    if (existingEntity) {
      return existingEntity;
    }

    const newEntity = await this.create(client, userId, chatId);

    return newEntity;
  }
}
