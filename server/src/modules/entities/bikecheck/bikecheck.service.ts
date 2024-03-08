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
  findAllForUser,
  findOneWithoutDownloadedPicture,
  setIsPictureDownloaded,
  getCount,
} from './queries';

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
    return (await findActive.run({ userId }, client)).map((r) =>
      Bikecheck.fromTableRow(r),
    );
  }

  async findDeleted(client: PoolClient, userId: string): Promise<Bikecheck[]> {
    return (await findInactive.run({ userId }, client)).map((r) =>
      Bikecheck.fromTableRow(r),
    );
  }

  async updateBikecheck(
    client: PoolClient,
    bikecheck: Bikecheck,
  ): Promise<Bikecheck> {
    return Bikecheck.fromTableRow(
      (await update.run({ ...bikecheck }, client))[0],
    );
  }

  async getBikechecksCount(
    client: PoolClient,
    userId: string,
  ): Promise<number> {
    return Number(
      (await getActiveBikechecksCount.run({ userId }, client))[0].count,
    );
  }

  async findOnSale(client: PoolClient): Promise<Bikecheck[]> {
    return (await findOnSale.run(undefined, client)).map((r) =>
      Bikecheck.fromTableRow(r),
    );
  }

  async findLiked(
    client: PoolClient,
    userId: string,
  ): Promise<{ bikecheck: Bikecheck; likeDate: Date }[]> {
    return (await findLiked.run({ userId }, client)).map((r) => ({
      bikecheck: Bikecheck.fromTableRow(r),
      likeDate: r.likeDate,
    }));
  }

  async getAllForUser(
    client: PoolClient,
    userId: string,
    limit: number,
    offset: number,
  ): Promise<Bikecheck[]> {
    return (await findAllForUser.run({ userId, limit, offset }, client)).map(
      (r) => Bikecheck.fromTableRow(r),
    );
  }

  async findBikecheckWithoutDownloadedPicture(
    client: PoolClient,
  ): Promise<Bikecheck | undefined> {
    const rows = await findOneWithoutDownloadedPicture.run(undefined, client);

    return rows.length > 0 ? Bikecheck.fromTableRow(rows[0]) : undefined;
  }

  async setIsPictureDownloaded(
    client: PoolClient,
    bikecheckId: string,
    isPictureDownloaded: boolean,
  ): Promise<void> {
    await setIsPictureDownloaded.run(
      { isPictureDownloaded, id: bikecheckId },
      client,
    );
  }

  async getCount(client: PoolClient): Promise<number> {
    return parseInt((await getCount.run(undefined, client))[0].count || '', 10);
  }
}
