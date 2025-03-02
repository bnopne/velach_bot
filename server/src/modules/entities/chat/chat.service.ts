import { Injectable } from '@nestjs/common';
import { type PoolClient } from 'pg';

import { Chat } from './chat.entity';
import {
  findById,
  insertChat,
  updateChat,
  getChats,
  getChatsOfType,
} from './queries';

@Injectable()
export class ChatService {
  async findById(client: PoolClient, id: string): Promise<Chat | null> {
    const rows = await findById.run({ id }, client);

    if (!rows.length) {
      return null;
    }

    return Chat.fromTableRow(rows[0]);
  }

  async getById(client: PoolClient, id: string): Promise<Chat> {
    const chat = await this.findById(client, id);

    if (!chat) {
      throw new Error(`Chat ${id} not found`);
    }

    return chat;
  }

  async createChat(client: PoolClient, chat: Chat): Promise<Chat> {
    const rows = await insertChat.run({ values: [{ ...chat }] }, client);
    return Chat.fromTableRow(rows[0]);
  }

  async updateChat(client: PoolClient, chat: Chat): Promise<Chat> {
    const rows = await updateChat.run({ ...chat }, client);
    return Chat.fromTableRow(rows[0]);
  }

  async createOrUpdateChat(client: PoolClient, chat: Chat): Promise<Chat> {
    let dbChat = await this.findById(client, chat.id);

    if (dbChat) {
      dbChat = await this.updateChat(client, chat);
    } else {
      dbChat = await this.createChat(client, chat);
    }

    return dbChat;
  }

  async getChats(
    client: PoolClient,
    {
      limit,
      offset,
      chatType,
    }: {
      limit: number;
      offset: number;
      chatType?: string;
    },
  ): Promise<Chat[]> {
    const rows = chatType
      ? await getChatsOfType.run({ limit, offset, chatType }, client)
      : await getChats.run({ limit, offset }, client);
    return rows.map((row) => Chat.fromTableRow(row));
  }
}
