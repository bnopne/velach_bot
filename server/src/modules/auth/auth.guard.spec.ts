import { type ExecutionContext } from '@nestjs/common';
import { type PoolClient } from 'pg';
import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';

import { disconnect } from 'src/common/database/connection';
import {
  getTestingModule,
  getTestConnection,
} from 'src/common/utils/test-utils';
import { PgPoolModule } from 'src/modules/pg-pool/pg-pool.module';
import { AdminPasscodeModule } from 'src/modules/admin-passcode/admin-passcode.module';
import { EntitiesModule } from 'src/modules/entities/entities.module';
import { USER_IDS } from 'src/common/database/test-database';
import { PgPoolService } from 'src/modules/pg-pool/pg-pool.service';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

function getMockExecutionContext(token?: string) {
  const request = {
    headers: {
      authorization: token ? `Bearer ${token}` : undefined,
    },
  };

  return {
    switchToHttp: () => ({
      getRequest: () => request,
    }),
  } as ExecutionContext;
}

describe('Test AuthGuard', () => {
  let guard: AuthGuard;
  let client: PoolClient;

  beforeEach(async () => {
    client = await getTestConnection();
    await client.query('START TRANSACTION');

    const module = await getTestingModule(
      [AuthGuard, AuthService],
      [PgPoolModule, JwtModule, AdminPasscodeModule, EntitiesModule],
    );

    guard = module.get<AuthGuard>(AuthGuard);
  });

  afterEach(async () => {
    await client.query('ROLLBACK');
    client.release();
  });

  afterAll(async () => {
    await disconnect();
  });

  test('test canActivate() returns true if token is valid and user is admin', async () => {
    const module = await Test.createTestingModule({
      imports: [PgPoolModule, JwtModule, AdminPasscodeModule, EntitiesModule],
      providers: [AuthGuard, AuthService],
    })
      .overrideProvider(AuthService)
      .useValue({
        verifyToken: () =>
          Promise.resolve({
            userId: USER_IDS.BILLY,
          }),
      })
      .overrideProvider(PgPoolService)
      .useValue({
        runInTransaction: (func: () => Promise<unknown>) => func(),
      })
      .compile();

    const authGuard = module.get<AuthGuard>(AuthGuard);
    const executionContext = getMockExecutionContext('token');

    const canActivate = await authGuard.canActivate(executionContext);

    expect(canActivate).toBe(true);
    expect(
      executionContext.switchToHttp().getRequest()['jwtPayload'],
    ).toStrictEqual({
      userId: USER_IDS.BILLY,
    });
  });

  test('test canActivate() returns false if token is present but cannot be verified', async () => {
    const module = await Test.createTestingModule({
      imports: [PgPoolModule, JwtModule, AdminPasscodeModule, EntitiesModule],
      providers: [AuthGuard, AuthService],
    })
      .overrideProvider(AuthService)
      .useValue({
        verifyToken: () => {
          throw new Error();
        },
      })
      .compile();

    const g = module.get<AuthGuard>(AuthGuard);

    expect(g.canActivate(getMockExecutionContext('token'))).resolves.toBe(
      false,
    );
  });

  test('test canActivate() returns false if no token present in request', async () => {
    expect(await guard.canActivate(getMockExecutionContext())).toBe(false);
  });
});
