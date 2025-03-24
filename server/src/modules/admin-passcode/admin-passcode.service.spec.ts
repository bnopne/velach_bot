import { Test, TestingModule } from '@nestjs/testing';
import { PoolClient } from 'pg';

import { AdminService } from 'src/modules/entities/admin/admin.service';
import { RandomService } from 'src/modules/random/random.service';
import { ConfigurationService } from 'src/modules/configuration/configuration.service';

import { AdminPasscodeService } from './admin-passcode.service';

const MOCK_POOL_CLIENT = {} as PoolClient;
const ADMIN_USER_ID = '1';
const NON_ADMIN_USER_ID = '2';
const RANDOM_STRING = 'random';
const TTL = 1;

describe('Test AdminPasscodeService', () => {
  let testingModule: TestingModule;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [AdminPasscodeService],
    })
      .useMocker((token) => {
        switch (token) {
          case AdminService:
            return {
              findUserById: async (client: unknown, userId: string) => {
                if (userId === ADMIN_USER_ID) {
                  return {};
                }

                return undefined;
              },
            };
          case RandomService:
            return {
              getString: () => RANDOM_STRING,
            };
          case ConfigurationService:
            return {
              adminPasscodeTTL: TTL,
            };
        }
      })
      .compile();
  });

  it('returns passcode for bot admin', () => {
    const service = testingModule.get(AdminPasscodeService);

    expect(service.getPasscode(MOCK_POOL_CLIENT, ADMIN_USER_ID)).resolves.toBe(
      RANDOM_STRING,
    );
  });

  it('throws error if user is not admin', () => {
    const service = testingModule.get(AdminPasscodeService);

    expect(
      service.getPasscode(MOCK_POOL_CLIENT, NON_ADMIN_USER_ID),
    ).rejects.toBeInstanceOf(Error);
  });

  it('returns userId for admin user and deletes stored passcode', async () => {
    const service = testingModule.get(AdminPasscodeService);

    const passcode = await service.getPasscode(MOCK_POOL_CLIENT, ADMIN_USER_ID);
    const userId = await service.getUserId(MOCK_POOL_CLIENT, passcode);

    expect(userId).toBe(ADMIN_USER_ID);
    expect(service['storage'].getValue(passcode)).toBe(undefined);
  });

  it('drops passcode when TTL expires', async () => {
    jest.useFakeTimers();

    const service = testingModule.get(AdminPasscodeService);

    const passcode = await service.getPasscode(MOCK_POOL_CLIENT, ADMIN_USER_ID);

    await jest.advanceTimersByTimeAsync(TTL * 1000 + 1);

    expect(service.getUserId(MOCK_POOL_CLIENT, passcode)).resolves.toBe(
      undefined,
    );

    jest.useRealTimers();
  });
});
