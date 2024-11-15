import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { type Request } from 'express';

import { PgPoolService } from 'src/modules/pg-pool/pg-pool.service';

import { AuthService } from './auth.service';
import { PoolClient } from 'pg';

function extractTokenFromRequest(request: Request): string | undefined {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly pgPoolService: PgPoolService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromRequest(request);

    if (!token) {
      return false;
    }

    try {
      const payload = await this.pgPoolService.runInTransaction(
        (client: PoolClient) => this.authService.verifyToken(client, token),
      );
      request['jwtPayload'] = payload;
    } catch (error) {
      return false;
    }

    return true;
  }
}
