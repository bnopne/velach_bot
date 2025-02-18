import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { type PoolClient } from 'pg';

import { AdminPasscodeService } from 'src/modules/admin-passcode/admin-passcode.service';

import { JWTPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminPasscodeService: AdminPasscodeService,
  ) {}

  async signInWithAdminPasscode(
    client: PoolClient,
    passcode: string,
  ): Promise<string> {
    const userId = await this.adminPasscodeService.getUserId(client, passcode);

    if (!userId) {
      throw new UnauthorizedException();
    }

    const payload: JWTPayload = {
      userId,
    };

    const token = await this.jwtService.signAsync(JSON.stringify(payload));

    return token;
  }

  async verifyJwt(token: string): Promise<JWTPayload> {
    let payload: JWTPayload;

    try {
      payload = await this.jwtService.verifyAsync<JWTPayload>(token);
    } catch (error) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
