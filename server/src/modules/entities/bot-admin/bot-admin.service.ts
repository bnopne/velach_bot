import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import { findById } from './queries';

@Injectable()
export class BotAdminService {
  async isBotAdmin(client: PoolClient, userId: string): Promise<boolean> {
    const rows = await findById.run({ userId }, client);
    return rows.length > 0;
  }
}
