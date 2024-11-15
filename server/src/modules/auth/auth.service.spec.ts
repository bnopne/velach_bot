import { JwtModule, JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { type PoolClient } from 'pg';

import { ConfigurationModule } from 'src/modules/configuration/configuration.module';
import { ConfigurationService } from 'src/modules/configuration/configuration.service';
import { AdminPasscodeModule } from 'src/modules/admin-passcode/admin-passcode.module';
import { AdminPasscodeService } from 'src/modules/admin-passcode/admin-passcode.service';
import { EntitiesModule } from 'src/modules/entities/entities.module';
import { RandomModule } from 'src/modules/random/random.module';
import { disconnect } from 'src/common/database/connection';
import { AdminService } from 'src/modules/entities/admin/admin.service';

import {
  getTestingModule,
  getTestConnection,
} from 'src/common/utils/test-utils';
import { USER_IDS } from 'src/common/database/test-database';

import { AuthService } from './auth.service';

describe('Test AuthService', () => {
  let authService: AuthService;
  let adminPasscodeService: AdminPasscodeService;
  let jwtService: JwtService;
  let adminService: AdminService;
  let client: PoolClient;

  beforeEach(async () => {
    const module = await getTestingModule(
      [AuthService],
      [
        RandomModule,
        EntitiesModule,
        ConfigurationModule,
        AdminPasscodeModule,
        JwtModule.registerAsync({
          imports: [ConfigurationModule],
          useFactory: async (configurationService: ConfigurationService) => ({
            secret: configurationService.jwtSecret,
          }),
          inject: [ConfigurationService],
        }),
      ],
    );
    authService = module.get<AuthService>(AuthService);
    adminPasscodeService =
      module.get<AdminPasscodeService>(AdminPasscodeService);
    jwtService = module.get<JwtService>(JwtService);
    adminService = module.get<AdminService>(AdminService);

    client = await getTestConnection();
    await client.query('START TRANSACTION');
  });

  afterEach(async () => {
    await client.query('ROLLBACK');
    client.release();
  });

  afterAll(async () => {
    await disconnect();
  });

  test('returns token if there is passcode for admin user', async () => {
    const passcode = await adminPasscodeService.getPasscode(
      client,
      USER_IDS.BILLY,
    );

    const token = await authService.signInWithPassode(client, passcode);

    const { userId } = await jwtService.decode(token);

    expect(userId).toBe(USER_IDS.BILLY);
  });

  test('throws exception if there is no passcode', async () => {
    expect(() =>
      authService.signInWithPassode(client, 'passcode'),
    ).rejects.toThrow(UnauthorizedException);
  });

  test('verifyToken throws exception if token cannot be verified', async () => {
    expect(() =>
      authService.verifyToken(client, 'invalid-token'),
    ).rejects.toThrow(UnauthorizedException);
  });

  test('verifyToken throws exception if token is for non-admin user', async () => {
    const passcode = await adminPasscodeService.getPasscode(
      client,
      USER_IDS.BILLY,
    );

    const token = await authService.signInWithPassode(client, passcode);

    adminService.deleteAdmin(client, USER_IDS.BILLY);

    expect(() => authService.verifyToken(client, token)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
