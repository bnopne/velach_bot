import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import { Bikecheck } from 'src/modules/entities/bikecheck/bikecheck.entity';
import {
  findById,
  findActive,
  getBikechecksCount,
  getRank,
  update,
  insertActive,
  findInactive,
  findOnSale,
  findTopBikecheck,
} from 'src/modules/entities/bikecheck/queries';

@Injectable()
export class BikecheckService {
  async createActive(
    client: PoolClient,
    userId: string,
    telegramImageId: string,
  ): Promise<Bikecheck> {
    const rows = await insertActive.run({ userId, telegramImageId }, client);
    return Bikecheck.fromTableRow(rows[0]);
  }

  async findById(client: PoolClient, id: string): Promise<Bikecheck | null> {
    const rows = await findById.run({ id }, client);

    if (!rows.length) {
      return null;
    }

    return Bikecheck.fromTableRow(rows[0]);
  }

  async getById(client: PoolClient, id: string): Promise<Bikecheck> {
    const bikecheck = await this.findById(client, id);

    if (!bikecheck) {
      throw new Error(`Bikecheck ${id} not found`);
    }

    return bikecheck;
  }

  async findActive(client: PoolClient, userId: string): Promise<Bikecheck[]> {
    const rows = await findActive.run({ userId }, client);
    return rows.map((r) => Bikecheck.fromTableRow(r));
  }

  async findDeleted(client: PoolClient, userId: string): Promise<Bikecheck[]> {
    const rows = await findInactive.run({ userId }, client);
    return rows.map((r) => Bikecheck.fromTableRow(r));
  }

  async updateBikecheck(
    client: PoolClient,
    bikecheck: Bikecheck,
  ): Promise<Bikecheck> {
    const rows = await update.run({ ...bikecheck }, client);
    return Bikecheck.fromTableRow(rows[0]);
  }

  async getBikechecksCount(
    client: PoolClient,
    userId: string,
  ): Promise<number> {
    const rows = await getBikechecksCount.run({ userId }, client);
    return Number(rows[0].count);
  }

  async getBikecheckRank(
    client: PoolClient,
    bikecheckId: string,
  ): Promise<number | null> {
    const rows = await getRank.run({ bikecheckId }, client);
    return rows.length ? Number(rows[0].rank) : null;
  }

  async findOnSale(client: PoolClient): Promise<Bikecheck[]> {
    const rows = await findOnSale.run(undefined, client);
    return rows.map((r) => Bikecheck.fromTableRow(r));
  }

  async getBikechecksTopData(
    client: PoolClient,
  ): Promise<{ bikecheckId: string; likes: number }[]> {
    const rows = await findTopBikecheck.run(undefined, client);
    return rows
      .map((r) => ({ bikecheckId: r.id, likes: parseInt(r.count || '0', 10) }))
      .filter((d) => d.likes);
  }
}
