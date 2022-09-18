import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import {
  findByUserId,
  insert,
} from 'src/modules/entities/admin-site-access/queries';
import { AdminSiteAccessEntity } from 'src/modules/entities/admin-site-access/admin-site-access.entity';

@Injectable()
export class AdminSiteAccessService {
  async findByUserId(
    client: PoolClient,
    userId: string,
  ): Promise<AdminSiteAccessEntity | null> {
    const rows = await findByUserId.run({ userId }, client);

    if (!rows.length) {
      return null;
    }

    return AdminSiteAccessEntity.fromTableRow(rows[0]);
  }

  async create(
    client: PoolClient,
    userId: string,
  ): Promise<AdminSiteAccessEntity> {
    const rows = await insert.run({ userId }, client);
    return AdminSiteAccessEntity.fromTableRow(rows[0]);
  }
}
