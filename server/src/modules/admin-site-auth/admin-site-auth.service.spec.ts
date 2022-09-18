import { JwtModule, JwtService } from '@nestjs/jwt';

import { USER_IDS } from 'src/common/database/test-database';
import { getTestingModule } from 'src/common/utils/test-utils';
import { ConfigurationModule } from 'src/modules/configuration/configuration.module';
import { InMemoryStorageModule } from 'src/modules/in-memory-storage/in-memory-storage.module';
import { InMemoryStorageService } from 'src/modules/in-memory-storage/in-memory-storage.service';
import { ConfigurationService } from 'src/modules/configuration/configuration.service';
import { JwtPayload } from 'src/modules/admin-site-auth/types';

import { AdminSiteAuthService } from './admin-site-auth.service';

const TEST_CODE = 'sir yes sir';

describe('Test AdminSiteAuthService', () => {
  let service: AdminSiteAuthService;
  let inMemoryStorageService: InMemoryStorageService;
  let configurationService: ConfigurationService;
  let jwtService: JwtService;

  beforeEach(async () => {
    jest.useFakeTimers();

    const module = await getTestingModule(
      [AdminSiteAuthService],
      [
        JwtModule.register({ secret: 'secret' }),
        ConfigurationModule,
        InMemoryStorageModule,
      ],
    );

    service = module.get(AdminSiteAuthService);
    inMemoryStorageService = module.get(InMemoryStorageService);
    configurationService = module.get(ConfigurationService);
    jwtService = module.get(JwtService);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('stores given access code in memory storage and removes it after code TTL expired', () => {
    service.setAccessCode(USER_IDS.BILLY, TEST_CODE);

    expect(
      inMemoryStorageService.get(`admin-site-access-code/${TEST_CODE}`),
    ).toBe(USER_IDS.BILLY);

    jest.advanceTimersByTime(
      configurationService.adminSiteAccessCodeTTL * 1000,
    );

    expect(
      inMemoryStorageService.get(`admin-site-access-code/${TEST_CODE}`),
    ).toBe(undefined);
  });

  it('returns undefined if there is no code for user', () => {
    expect(service.findUserIdByAccessCode(TEST_CODE)).toBe(undefined);
  });

  it('returns user id if there is a code for user', () => {
    inMemoryStorageService.set(
      `admin-site-access-code/${TEST_CODE}`,
      USER_IDS.BILLY,
    );

    expect(service.findUserIdByAccessCode(TEST_CODE)).toBe(USER_IDS.BILLY);
  });

  it('removes user code', () => {
    inMemoryStorageService.set(
      `admin-site-access-code/${TEST_CODE}`,
      USER_IDS.BILLY,
    );

    service.revokeAccessCode(TEST_CODE);

    expect(service.findUserIdByAccessCode(TEST_CODE)).toBe(undefined);
  });

  it('generates JWT for user', () => {
    const token = service.generateUserJWT(USER_IDS.BILLY);

    expect((jwtService.decode(token) as JwtPayload).userId).toBe(
      USER_IDS.BILLY,
    );
  });
});
