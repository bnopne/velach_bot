import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import { BotAdmin } from './bot-admin.entity';
import { findByUserId } from './queries';

@Injectable()
export class BotAdminService {
  async findByUserId(
    client: PoolClient,
    userId: string,
  ): Promise<BotAdmin | undefined> {
    const rows = await findByUserId.run({ userId }, client);

    return rows.length > 0 ? BotAdmin.fromTableRow(rows[0]) : undefined;
  }
}
