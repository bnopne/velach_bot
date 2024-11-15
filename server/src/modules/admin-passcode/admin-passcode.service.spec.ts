import { UnauthorizedException } from '@nestjs/common';
import { type PoolClient } from 'pg';

import { ConfigurationModule } from 'src/modules/configuration/configuration.module';
import { EntitiesModule } from 'src/modules/entities/entities.module';
import { RandomModule } from 'src/modules/random/random.module';
import { disconnect } from 'src/common/database/connection';

import {
  getTestingModule,
  getTestConnection,
} from 'src/common/utils/test-utils';
import { USER_IDS } from 'src/common/database/test-database';

import { AdminPasscodeService } from './admin-passcode.service';

describe('Test AdminPasscodeService', () => {
  let adminPasscodeService: AdminPasscodeService;
  let client: PoolClient;

  beforeEach(async () => {
    const module = await getTestingModule(
      [AdminPasscodeService],
      [RandomModule, EntitiesModule, ConfigurationModule],
    );

    adminPasscodeService =
      module.get<AdminPasscodeService>(AdminPasscodeService);

    client = await getTestConnection();

    await client.query('START TRANSACTION');
  });

  afterEach(async () => {
    await client.query('ROLLBACK');
    client.release();
    await adminPasscodeService.onModuleDestroy();
  });

  afterAll(async () => {
    await disconnect();
  });

  test('service returns passcode for admin user', async () => {
    const passcode = await adminPasscodeService.getPasscode(
      client,
      USER_IDS.BILLY,
    );

    expect(typeof passcode).toBe('string');
  });

  test('service throws error if passcode is requested for non-admin user', async () => {
    expect(
      adminPasscodeService.getPasscode(client, USER_IDS.MARK),
    ).rejects.toThrow(UnauthorizedException);
  });

  test('service returns and revokes existing passcode', async () => {
    const passcode = await adminPasscodeService.getPasscode(
      client,
      USER_IDS.BILLY,
    );

    const userId = await adminPasscodeService.getUserId(client, passcode);

    expect(userId).toBe(USER_IDS.BILLY);

    expect(adminPasscodeService.getUserId(client, passcode)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  test('service throws error if passcode is expired', async () => {
    jest.useFakeTimers();

    const passcode = await adminPasscodeService.getPasscode(
      client,
      USER_IDS.BILLY,
    );

    jest.advanceTimersToNextTimer();

    expect(adminPasscodeService.getUserId(client, passcode)).rejects.toThrow(
      UnauthorizedException,
    );

    jest.useRealTimers();
  });
});
