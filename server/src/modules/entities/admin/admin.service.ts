import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import { Admin } from './admin.entity';
import { findByUserId, insertAdmin, deleteAdmin } from './queries';

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

  async insertAdmin(client: PoolClient, userId: string): Promise<Admin> {
    const rows = await insertAdmin.run({ userId }, client);
    return Admin.fromTableRow(rows[0]);
  }

  async deleteAdmin(client: PoolClient, userId: string): Promise<void> {
    await deleteAdmin.run({ userId }, client);
  }
}
