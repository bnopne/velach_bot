import { Injectable } from '@nestjs/common';
import { type PoolClient } from 'pg';

import { InMemoryStorage } from 'src/common/in-memory-storage';
import { AdminService } from 'src/modules/entities/admin/admin.service';
import { RandomService } from 'src/modules/random/random.service';
import { ConfigurationService } from 'src/modules/configuration/configuration.service';

@Injectable()
export class AdminPasscodeService {
  private readonly adminService: AdminService;
  private readonly randomService: RandomService;
  private readonly configurationService: ConfigurationService;

  private readonly storage: InMemoryStorage;

  constructor(
    adminService: AdminService,
    randomService: RandomService,
    configurationService: ConfigurationService,
  ) {
    this.adminService = adminService;
    this.randomService = randomService;
    this.configurationService = configurationService;

    this.storage = new InMemoryStorage();
  }

  async getPasscode(client: PoolClient, userId: string): Promise<string> {
    const admin = await this.adminService.findUserById(client, userId);

    if (!admin) {
      throw new Error(`user ${userId} is not admin`);
    }

    const passcode = this.randomService.getString(16);

    this.storage.setValue(
      passcode,
      userId,
      this.configurationService.adminPasscodeTTL * 1000,
    );

    return passcode;
  }

  async getUserId(
    client: PoolClient,
    passcode: string,
  ): Promise<string | undefined> {
    const userId = this.storage.getValue<string>(passcode);

    if (!userId) {
      return undefined;
    }

    const admin = await this.adminService.findUserById(client, userId);

    if (!admin) {
      return undefined;
    }

    this.storage.deleteValue(passcode);

    return userId;
  }
}
