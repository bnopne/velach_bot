import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PgPoolService } from 'src/modules/pg-pool/pg-pool.service';
import { UserService } from 'src/modules/entities/user/user.service';
import { InMemoryStorageService } from 'src/modules/in-memory-storage/in-memory-storage.service';
import { RandomService } from 'src/modules/random/random.service';
import { BotAdminService } from 'src/modules/entities/bot-admin/bot-admin.service';
import { ConfigurationService } from 'src/modules/configuration/configuration.service';

@Injectable()
export class AuthApiService {
  constructor(
    private pgPoolService: PgPoolService,
    private userService: UserService,
    private inMemoryStorageService: InMemoryStorageService,
    private randomService: RandomService,
    private botAdminService: BotAdminService,
    private configurationService: ConfigurationService,
  ) {}

  async setAdminAccessCode(userId: string): Promise<string> {
    const user = await this.pgPoolService.runInTransaction((connection) =>
      this.userService.findById(connection, userId),
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    const isBotAdmin = await this.pgPoolService.runInTransaction((connection) =>
      this.botAdminService.isBotAdmin(connection, user.id),
    );

    if (!isBotAdmin) {
      throw new UnauthorizedException();
    }

    const accessCode = this.randomService.getString(32);

    this.inMemoryStorageService.set(
      `admin/access-codes/${accessCode}`,
      user.id,
      this.configurationService.adminAccessCodeTTL,
    );

    return accessCode;
  }

  findUserIdByAccessCode(accessCode: string): string | undefined {
    const userId = this.inMemoryStorageService.get<string>(
      `admin/access-codes/${accessCode}`,
    );

    return userId;
  }

  revokeAccessCode(accessCode: string): void {
    this.inMemoryStorageService.delete(accessCode);
  }
}
