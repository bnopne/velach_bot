import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import { Bikecheck } from 'src/modules/entities/bikecheck/bikecheck.entity';
import {
  findById,
  findActive,
  getActiveBikechecksCount,
  update,
  insertActive,
  findInactive,
  findOnSale,
  findLiked,
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
    const rows = await getActiveBikechecksCount.run({ userId }, client);
    return Number(rows[0].count);
  }

  async findOnSale(client: PoolClient): Promise<Bikecheck[]> {
    const rows = await findOnSale.run(undefined, client);
    return rows.map((r) => Bikecheck.fromTableRow(r));
  }

  async findLiked(
    client: PoolClient,
    userId: string,
  ): Promise<{ bikecheck: Bikecheck; likeDate: Date }[]> {
    const rows = await findLiked.run({ userId }, client);
    return rows.map((r) => ({
      bikecheck: Bikecheck.fromTableRow(r),
      likeDate: r.likeDate,
    }));
  }
}
