import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { type PoolClient } from 'pg';

import { AdminPasscodeService } from 'src/modules/admin-passcode/admin-passcode.service';

import { AuthService } from './auth.service';
import { type JWTPayload } from './types';

const MOCK_POOL_CLIENT = {} as PoolClient;

describe('Test AuthService', () => {
  describe('Test signInWithAdminPasscode', () => {
    const VALID_PASSCODE = 'pass';
    const INVALID_PASSCODE = 'no pass';
    const USER_ID = '1';

    let testModule: TestingModule;
    let service: AuthService;

    beforeEach(async () => {
      testModule = await Test.createTestingModule({
        providers: [AuthService],
      })
        .useMocker((token) => {
          switch (token) {
            case JwtService:
              return {
                signAsync: async (payload: JWTPayload) => payload,
              };
            case AdminPasscodeService:
              return {
                getUserId: async (client: unknown, passcode: string) =>
                  passcode === VALID_PASSCODE ? USER_ID : undefined,
              };
          }
        })
        .compile();

      service = testModule.get(AuthService);
    });

    it('throws exception if invalid passcode provided', () => {
      expect(
        service.signInWithAdminPasscode(MOCK_POOL_CLIENT, INVALID_PASSCODE),
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('returns payload if valid passcode provided', () => {
      expect(
        service.signInWithAdminPasscode(MOCK_POOL_CLIENT, VALID_PASSCODE),
      ).resolves.toBe(JSON.stringify({ userId: USER_ID }));
    });
  });

  describe('Test verifyJwt', () => {
    const VALID_TOKEN = 'VALID';
    const INVALID_TOKEN = 'INVALID';
    const JWT_PAYLOAD: JWTPayload = {
      userId: '1',
    };

    let testModule: TestingModule;
    let service: AuthService;

    beforeEach(async () => {
      testModule = await Test.createTestingModule({
        providers: [AuthService],
      })
        .useMocker((token) => {
          switch (token) {
            case JwtService:
              return {
                verifyAsync: async (token: string): Promise<JWTPayload> => {
                  if (token === VALID_TOKEN) {
                    return JWT_PAYLOAD;
                  } else {
                    throw new UnauthorizedException();
                  }
                },
              };
            case AdminPasscodeService:
              return {};
          }
        })
        .compile();

      service = testModule.get(AuthService);
    });

    it('throws exception if invalid token is provided', () => {
      expect(service.verifyJwt(INVALID_TOKEN)).rejects.toBeInstanceOf(
        UnauthorizedException,
      );
    });

    it('returns payload if valid token is provided', () => {
      expect(service.verifyJwt(VALID_TOKEN)).resolves.toBe(JWT_PAYLOAD);
    });
  });
});
