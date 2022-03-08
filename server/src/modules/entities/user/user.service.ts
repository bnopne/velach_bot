import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import { User } from 'src/modules/entities/user/user.entity';
import {
  findById,
  insertUser,
  updateUser,
} from 'src/modules/entities/user/queries';

@Injectable()
export class UserService {
  async findById(client: PoolClient, id: string): Promise<User | null> {
    const rows = await findById.run({ id }, client);

    if (!rows.length) {
      return null;
    }

    return User.fromTableRow(rows[0]);
  }

  async getById(client: PoolClient, id: string): Promise<User> {
    const chat = await this.findById(client, id);

    if (!chat) {
      throw new Error(`User ${id} not found`);
    }

    return chat;
  }

  async createUser(client: PoolClient, user: User): Promise<User> {
    const rows = await insertUser.run({ values: [user] }, client);
    return User.fromTableRow(rows[0]);
  }

  async updateUser(client: PoolClient, user: User): Promise<User> {
    const rows = await updateUser.run({ ...user }, client);
    return User.fromTableRow(rows[0]);
  }

  async createOrUpdateUser(client: PoolClient, user: User): Promise<User> {
    let dbUser = await this.findById(client, user.id);

    if (dbUser) {
      dbUser = await this.updateUser(client, user);
    } else {
      dbUser = await this.createUser(client, user);
    }

    return dbUser;
  }
}
