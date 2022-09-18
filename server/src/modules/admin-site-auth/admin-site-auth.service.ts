import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { InMemoryStorageService } from 'src/modules/in-memory-storage/in-memory-storage.service';
import { ConfigurationService } from 'src/modules/configuration/configuration.service';
import { JwtPayload } from 'src/modules/admin-site-auth/types';

@Injectable()
export class AdminSiteAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configurationService: ConfigurationService,
    private readonly inMemoryStorageService: InMemoryStorageService,
  ) {}

  setAccessCode(userId: string, code: string): void {
    this.inMemoryStorageService.set(
      `admin-site-access-code/${code}`,
      userId,
      this.configurationService.adminSiteAccessCodeTTL * 1000,
    );
  }

  findUserIdByAccessCode(code: string): string | undefined {
    return (
      this.inMemoryStorageService.get<string>(
        `admin-site-access-code/${code}`,
      ) || undefined
    );
  }

  revokeAccessCode(code: string): void {
    this.inMemoryStorageService.delete(`admin-site-access-code/${code}`);
  }

  generateUserJWT(userId: string): string {
    const payload: JwtPayload = { userId };
    return this.jwtService.sign(payload, { expiresIn: '1h' });
  }
}
