import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { type PoolClient } from 'pg';

import { AdminPasscodeService } from 'src/modules/admin-passcode/admin-passcode.service';
import { AdminService } from 'src/modules/entities/admin/admin.service';

import { type JWTPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminPasscodeService: AdminPasscodeService,
    private readonly adminService: AdminService,
  ) {}

  async signInWithPassode(
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

  async verifyToken(client: PoolClient, token: string): Promise<JWTPayload> {
    let payload: JWTPayload;

    try {
      payload = await this.jwtService.verifyAsync(token);
    } catch (error) {
      throw new UnauthorizedException();
    }

    const admin = await this.adminService.findUserById(client, payload.userId);

    if (!admin) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
