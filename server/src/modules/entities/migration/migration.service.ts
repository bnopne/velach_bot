import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import { Migration } from './migration.entity';
import { findByName, getAll, insert } from './queries';

@Injectable()
export class MigrationService {
  async findByName(
    client: PoolClient,
    name: string,
  ): Promise<Migration | null> {
    const rows = await findByName.run({ name }, client);
    return rows.length ? Migration.fromTableRow(rows[0]) : null;
  }

  async getAll(client: PoolClient): Promise<Migration[]> {
    const rows = await getAll.run(undefined, client);
    return rows.map((r) => Migration.fromTableRow(r));
  }

  async create(client: PoolClient, name: string): Promise<Migration> {
    const rows = await insert.run({ name }, client);

    if (!rows.length) {
      throw new Error('No rows returned after migration insert');
    }

    return Migration.fromTableRow(rows[0]);
  }
}
