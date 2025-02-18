import {
  type CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { type Request } from 'express';
import { type JWTPayload } from './types';

const logger = new Logger('Auth Guard');

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      logger.warn(
        `Reject request to ${request.method} ${request.path} due to NO TOKEN`,
      );
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync<JWTPayload>(token);
      request['userId'] = payload.userId;
    } catch {
      logger.warn(
        `Reject request to ${request.method} ${request.path} due to INVALID TOKEN`,
      );
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
