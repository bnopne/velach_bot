import { Injectable } from '@nestjs/common';

import { RandomService } from 'src/modules/random/random.service';
import { InMemoryStorageService } from 'src/modules/in-memory-storage/in-memory-storage.service';
import { ConfigurationService } from 'src/modules/configuration/configuration.service';

@Injectable()
export class AdminPasscodeService {
  constructor(
    private readonly randomService: RandomService,
    private readonly inMemoryStorageService: InMemoryStorageService,
    private readonly configurationService: ConfigurationService,
  ) {}

  async createPasscode(userId: string): Promise<string> {
    const passcode = this.randomService.getString(
      this.configurationService.adminPasscodeLength,
    );

    this.inMemoryStorageService.set(`admin-passcode/${passcode}`, userId, {
      TTL: this.configurationService.adminPasscodeTTL * 1000,
    });

    return passcode;
  }

  async verifyPasscode(passcode: string): Promise<string> {
    const userId = this.inMemoryStorageService.get<string>(
      `admin-passcode/${passcode}`,
      {},
    );
    this.inMemoryStorageService.delete(`admin-passcode/${passcode}`, {});
    return userId;
  }
}
