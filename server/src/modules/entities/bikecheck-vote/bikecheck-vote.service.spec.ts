import { TestingModule } from '@nestjs/testing';
import { PoolClient } from 'pg';

import {
  BILLY_ID,
  VAN_ID,
  MARK_ID,
  STEVE_ID,
} from 'src/common/database/test-database';
import { disconnect } from 'src/common/database/connection';
import {
  getTestConnection,
  getTestingModule,
} from 'src/common/utils/test-utils';
import { BikecheckService } from 'src/modules/entities/bikecheck/bikecheck.service';

import { BikecheckVote } from './bikecheck-vote.entity';
import { BikecheckVoteService } from './bikecheck-vote.service';

describe('Test BikecheckVoteService', () => {
  let voteService: BikecheckVoteService;
  let bikecheckService: BikecheckService;
  let client: PoolClient;

  beforeEach(async () => {
    const module: TestingModule = await getTestingModule([
      BikecheckVoteService,
      BikecheckService,
    ]);
    voteService = module.get(BikecheckVoteService);
    bikecheckService = module.get(BikecheckService);
    client = await getTestConnection(module);
    await client.query('START TRANSACTION');
  });

  afterEach(async () => {
    await client.query('ROLLBACK');
    client.release();
  });

  afterAll(async () => {
    await disconnect();
  });

  test('create() creates vote with given points', async () => {
    const bikecheck = (await bikecheckService.findActive(client, BILLY_ID))[0];
    await voteService.create(client, bikecheck.id, VAN_ID, 100500);
    const vote = await voteService.findUserVote(client, VAN_ID, bikecheck.id);

    expect(vote).toBeInstanceOf(BikecheckVote);
    expect(vote?.points).toBe(100500);
  });

  test('update() updates entity', async () => {
    const bikecheck = (await bikecheckService.findActive(client, BILLY_ID))[0];
    const vote = await voteService.create(client, bikecheck.id, VAN_ID, 100500);
    vote.points = 265;
    await voteService.update(client, vote);

    const updatedVote = await voteService.findUserVote(
      client,
      VAN_ID,
      bikecheck.id,
    );
    expect(updatedVote).toBeInstanceOf(BikecheckVote);
    expect(updatedVote?.points).toBe(265);
  });

  test('getBikecheckLikesCount() returns likes count', async () => {
    const bikecheck = (await bikecheckService.findActive(client, BILLY_ID))[0];

    let likes = await voteService.getBikecheckLikesCount(client, bikecheck.id);
    expect(likes).toBe(0);

    await voteService.create(client, bikecheck.id, VAN_ID, 1);

    likes = await voteService.getBikecheckLikesCount(client, bikecheck.id);
    expect(likes).toBe(1);
  });

  test('getBikecheckDislikesCount() returns dislikes count', async () => {
    const bikecheck = (await bikecheckService.findActive(client, BILLY_ID))[0];

    let dislikes = await voteService.getBikecheckDislikesCount(
      client,
      bikecheck.id,
    );
    expect(dislikes).toBe(0);

    await voteService.create(client, bikecheck.id, VAN_ID, -1);

    dislikes = await voteService.getBikecheckDislikesCount(
      client,
      bikecheck.id,
    );
    expect(dislikes).toBe(1);
  });

  test('findUserVote() returns user vote', async () => {
    const bikecheck = (await bikecheckService.findActive(client, BILLY_ID))[0];
    let vote = await voteService.findUserVote(client, VAN_ID, bikecheck.id);

    expect(vote).toBe(null);

    await voteService.create(client, bikecheck.id, VAN_ID, 100500);

    vote = await voteService.findUserVote(client, VAN_ID, bikecheck.id);
    expect(vote).toBeInstanceOf(BikecheckVote);
  });

  test('getBikecheckRank() returns bikecheck rank', async () => {
    const billyBikecheck = (
      await bikecheckService.findActive(client, BILLY_ID)
    )[0];
    const vanBikecheck = (await bikecheckService.findActive(client, VAN_ID))[0];

    expect(await voteService.getBikecheckRank(client, billyBikecheck.id)).toBe(
      null,
    );
    expect(await voteService.getBikecheckRank(client, vanBikecheck.id)).toBe(
      null,
    );

    await voteService.create(client, billyBikecheck.id, VAN_ID, 1);
    await voteService.create(client, billyBikecheck.id, MARK_ID, 1);
    await voteService.create(client, billyBikecheck.id, STEVE_ID, 1);

    await voteService.create(client, vanBikecheck.id, MARK_ID, 1);
    await voteService.create(client, vanBikecheck.id, STEVE_ID, 1);

    expect(await voteService.getBikecheckRank(client, billyBikecheck.id)).toBe(
      1,
    );
    expect(await voteService.getBikecheckRank(client, vanBikecheck.id)).toBe(2);
  });

  test('getBikechecksTopData() returns top data', async () => {
    const billyBikecheck = (
      await bikecheckService.findActive(client, BILLY_ID)
    )[0];
    const vanBikecheck = (await bikecheckService.findActive(client, VAN_ID))[0];

    expect(await voteService.getBikechecksTopData(client)).toHaveLength(0);

    await voteService.create(client, billyBikecheck.id, VAN_ID, 1);
    await voteService.create(client, billyBikecheck.id, MARK_ID, 1);
    await voteService.create(client, billyBikecheck.id, STEVE_ID, 1);

    await voteService.create(client, vanBikecheck.id, MARK_ID, 1);
    await voteService.create(client, vanBikecheck.id, STEVE_ID, 1);

    const top = await voteService.getBikechecksTopData(client);

    expect(top).toHaveLength(2);
    expect(top[0].bikecheckId).toBe(billyBikecheck.id);
    expect(top[0].likes).toBe(3);
    expect(top[1].bikecheckId).toBe(vanBikecheck.id);
    expect(top[1].likes).toBe(2);
  });
});
