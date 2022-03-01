import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import { BikecheckVote } from 'src/modules/entities/bikecheck-vote/bikecheck-vote.entity';
import {
  findById,
  getBikecheckLikesCount,
  getBikecheckDislikesCount,
  selectByUserAndBikecheck,
  update,
  insert,
  getRank,
  findTopBikecheck,
} from 'src/modules/entities/bikecheck-vote/queries';

@Injectable()
export class BikecheckVoteService {
  async findById(
    client: PoolClient,
    id: string,
  ): Promise<BikecheckVote | null> {
    const rows = await findById.run({ id }, client);

    if (!rows.length) {
      return null;
    }

    return BikecheckVote.fromTableRow(rows[0]);
  }

  async getById(client: PoolClient, id: string): Promise<BikecheckVote> {
    const bikecheck = await this.findById(client, id);

    if (!bikecheck) {
      throw new Error(`BikecheckVote ${id} not found`);
    }

    return bikecheck;
  }

  async getBikecheckLikesCount(
    client: PoolClient,
    bikecheckId: string,
  ): Promise<number> {
    const rows = await getBikecheckLikesCount.run({ bikecheckId }, client);
    return Number(rows[0].count);
  }

  async getBikecheckDislikesCount(
    client: PoolClient,
    bikecheckId: string,
  ): Promise<number> {
    const rows = await getBikecheckDislikesCount.run({ bikecheckId }, client);
    return Number(rows[0].count);
  }

  async findUserVote(
    client: PoolClient,
    userId: string,
    bikecheckId: string,
  ): Promise<BikecheckVote | null> {
    const rows = await selectByUserAndBikecheck.run(
      { userId, bikecheckId },
      client,
    );
    return rows.length ? BikecheckVote.fromTableRow(rows[0]) : null;
  }

  async update(
    client: PoolClient,
    vote: BikecheckVote,
  ): Promise<BikecheckVote> {
    const rows = await update.run(
      { bikecheckVoteId: vote.id, points: vote.points },
      client,
    );
    return BikecheckVote.fromTableRow(rows[0]);
  }

  async create(
    client: PoolClient,
    bikecheckId: string,
    userId: string,
    points: number,
  ): Promise<BikecheckVote> {
    const rows = await insert.run({ userId, bikecheckId, points }, client);
    return BikecheckVote.fromTableRow(rows[0]);
  }

  async getBikecheckRank(
    client: PoolClient,
    bikecheckId: string,
  ): Promise<number | null> {
    const rows = await getRank.run({ bikecheckId }, client);
    return rows.length ? Number(rows[0].rank) : null;
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
