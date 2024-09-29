import { Injectable } from '@nestjs/common';

import { AdminPasscodeService } from './admin-passcode.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminPasscodeService: AdminPasscodeService,
    private readonly jwtService: JwtService,
  ) {}

  async signInWithPasscode(passcode: string): Promise<string> {
    const userId = await this.adminPasscodeService.verifyPasscode(passcode);
    const token = await this.jwtService.signAsync({ userId });
    return token;
  }
}
