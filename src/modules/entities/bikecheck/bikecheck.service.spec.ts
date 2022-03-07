import { TestingModule } from '@nestjs/testing';
import { PoolClient } from 'pg';

import { BILLY_ID, VAN_ID } from 'src/common/database/test-database';
import { disconnect } from 'src/common/database/connection';
import {
  getTestConnection,
  getTestingModule,
} from 'src/common/utils/test-utils';
import { BikecheckVoteService } from 'src/modules/entities/bikecheck-vote/bikecheck-vote.service';

import { Bikecheck } from './bikecheck.entity';
import { BikecheckService } from './bikecheck.service';

describe('Test BikecheckService', () => {
  let bikecheckService: BikecheckService;
  let connection: PoolClient;

  beforeEach(async () => {
    const module: TestingModule = await getTestingModule([
      BikecheckService,
      BikecheckVoteService,
    ]);
    bikecheckService = module.get(BikecheckService);
    connection = await getTestConnection(module);
    await connection.query('START TRANSACTION');
  });

  afterEach(async () => {
    await connection.query('ROLLBACK');
    connection.release();
  });

  afterAll(async () => {
    await disconnect();
  });

  test('findById() returns existing bikecheck', async () => {
    const bikecheck = await bikecheckService.findById(connection, '1');
    expect(bikecheck).toBeInstanceOf(Bikecheck);
  });

  test('findById() returns null if bikecheck does not exist', async () => {
    const bikecheck = await bikecheckService.findById(connection, '100500');
    expect(bikecheck).toBe(null);
  });

  test('getById() returns existing bikecheck', async () => {
    const bikecheck = await bikecheckService.getById(connection, '1');
    expect(bikecheck).toBeInstanceOf(Bikecheck);
  });

  test('getById() throws error if bikecheck does not exist', async () => {
    try {
      await bikecheckService.getById(connection, '100500');
    } catch (err) {
      expect(err).toBeDefined();
    }

    expect.assertions(1);
  });

  test('findActive() returns active bikechecks', async () => {
    let b = await bikecheckService.findActive(connection, BILLY_ID);
    expect(b.length).toBe(2);
    b = await bikecheckService.findActive(connection, VAN_ID);
    expect(b.length).toBe(1);
  });

  test('findDeleted() returns inactive bikechecks', async () => {
    let b = await bikecheckService.findDeleted(connection, BILLY_ID);
    expect(b.length).toBe(0);
    b = await bikecheckService.findDeleted(connection, VAN_ID);
    expect(b.length).toBe(1);
  });

  test('updateBikecheck() updates bikecheck', async () => {
    let bikechecks = await bikecheckService.findDeleted(connection, VAN_ID);
    expect(bikechecks.length).toBe(1);

    bikechecks[0].isActive = true;
    await bikecheckService.updateBikecheck(connection, bikechecks[0]);

    bikechecks = await bikecheckService.findDeleted(connection, VAN_ID);
    expect(bikechecks.length).toBe(0);
  });

  test('getBikechecksCount() returns active bikechecks count', async () => {
    expect(
      await bikecheckService.getBikechecksCount(connection, BILLY_ID),
    ).toBe(2);
    expect(await bikecheckService.getBikechecksCount(connection, VAN_ID)).toBe(
      1,
    );
  });

  test('findOnSale() returns bikechecks on sale', async () => {
    expect(await bikecheckService.findOnSale(connection)).toHaveLength(0);

    const bikecheck = await bikecheckService.getById(connection, '1');
    bikecheck.onSale = true;
    await bikecheckService.updateBikecheck(connection, bikecheck);

    expect(await bikecheckService.findOnSale(connection)).toHaveLength(1);
  });
});
