import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { type PoolClient } from 'pg';

import { PgPoolService } from 'src/modules/pg-pool/pg-pool.service';

import { AuthController } from './auth.controller';
import { SignInWithPasscodeBody, SignInWithPasscodeResponse } from './dto';
import { AuthService } from './auth.service';

describe('Test AuthController', () => {
  const VALID_PASSCODE = 'valid';
  const INVALID_PASSCODE = 'invalid';
  const TOKEN = 'token';

  const MOCK_POOL_CLIENT = {} as PoolClient;

  let testModule: TestingModule;
  let controller: AuthController;

  beforeEach(async () => {
    testModule = await Test.createTestingModule({
      controllers: [AuthController],
    })
      .useMocker((token) => {
        switch (token) {
          case AuthService:
            return {
              signInWithAdminPasscode: async (
                client: unknown,
                passcode: string,
              ) => {
                if (passcode === VALID_PASSCODE) {
                  return TOKEN;
                }

                throw new UnauthorizedException();
              },
            };
          case PgPoolService:
            return {
              runInTransaction: <R>(
                func: (client: PoolClient) => Promise<R>,
              ) => {
                return func(MOCK_POOL_CLIENT);
              },
            };
        }
      })
      .compile();

    controller = testModule.get(AuthController);
  });

  it('throws exception if invalid passcode is provided', () => {
    const body = new SignInWithPasscodeBody();
    body.passcode = INVALID_PASSCODE;
    expect(controller.signInWithPasscode(body)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });

  it('throws exception if invalid request provided', () => {
    expect(
      controller.signInWithPasscode({
        foo: 'bar',
      } as unknown as SignInWithPasscodeBody),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('returns response if valid passcode is provided', () => {
    const body = new SignInWithPasscodeBody();
    body.passcode = VALID_PASSCODE;
    expect(controller.signInWithPasscode(body)).resolves.toStrictEqual(
      new SignInWithPasscodeResponse(TOKEN),
    );
  });
});
