import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ADMIN_SITE_COOKIE_NAME } from 'src/modules/admin-api/auth-api/constants';
import { ConfigurationService } from 'src/modules/configuration/configuration.service';
import { JWTPayload } from 'src/modules/admin-api/auth-api/types';

@Injectable()
export class AuthApiGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configurationService: ConfigurationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies[ADMIN_SITE_COOKIE_NAME];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync<JWTPayload>(token, {
        secret: this.configurationService.JWTSecret,
      });

      request['userId'] = payload.userId;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
