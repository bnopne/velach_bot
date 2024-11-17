import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import { Admin } from './admin.entity';
import { findByUserId } from './queries';

@Injectable()
export class AdminService {
  async findUserById(
    client: PoolClient,
    userId: string,
  ): Promise<Admin | null> {
    const rows = await findByUserId.run({ userId }, client);

    if (!rows.length) {
      return null;
    }

    return Admin.fromTableRow(rows[0]);
  }
}
