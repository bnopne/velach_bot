import {
  Injectable,
  UnauthorizedException,
  type CanActivate,
  type ExecutionContext,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

function getAuthTokenFromHeader(
  authorizationHeader?: string,
): string | undefined {
  if (!authorizationHeader) {
    return undefined;
  }

  const [type, token] = authorizationHeader.split(' ');

  return type === 'Bearer' ? token : undefined;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const jwt = getAuthTokenFromHeader(request.headers.authorization);

    if (!jwt) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(jwt);
      request.userId = payload.userId;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
