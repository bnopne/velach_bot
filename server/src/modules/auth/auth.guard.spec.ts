import { type ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthGuard } from './auth.guard';
import { type JWTPayload } from './types';

const VALID_TOKEN = 'VALID';
const INVALID_TOKEN = 'INVALID';
const JWT_PAYLOAD: JWTPayload = {
  userId: '1',
};

const getMockExecutionContext = (token?: string) => {
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
};

describe('Test AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    guard = new AuthGuard({
      verifyAsync: async (token: string) => {
        if (token === VALID_TOKEN) {
          return JWT_PAYLOAD;
        } else {
          throw new UnauthorizedException();
        }
      },
    } as JwtService);
  });

  it('throws error if no token provided in request', async () => {
    await expect(
      guard.canActivate(getMockExecutionContext()),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('throws error if invalid token provided in request', async () => {
    await expect(
      guard.canActivate(getMockExecutionContext(INVALID_TOKEN)),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('returns true if valid token provided in request, sets payload to request object', async () => {
    const ctx = getMockExecutionContext(VALID_TOKEN);
    await expect(guard.canActivate(ctx)).resolves.toBe(true);
    expect(ctx.switchToHttp().getRequest().userId).toBe(JWT_PAYLOAD.userId);
  });
});
