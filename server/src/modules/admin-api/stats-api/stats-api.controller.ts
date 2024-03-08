import { Get, UseGuards, Controller } from '@nestjs/common';

import { PgPoolService } from 'src/modules/pg-pool/pg-pool.service';
import { AuthApiGuard } from 'src/modules/admin-api/auth-api/auth-api.guard';
import { BikecheckService } from 'src/modules/entities/bikecheck/bikecheck.service';
import { UserService } from 'src/modules/entities/user/user.service';
import { ChatService } from 'src/modules/entities/chat/chat.service';

class GeneralStats {
  bikechecksCount: number;
  usersCount: number;
  chatsCount: number;

  constructor(bikechecksCount: number, usersCount: number, chatsCount: number) {
    this.bikechecksCount = bikechecksCount;
    this.usersCount = usersCount;
    this.chatsCount = chatsCount;
  }
}

@Controller()
export class StatsApiController {
  constructor(
    private readonly pgPoolService: PgPoolService,
    private readonly bikecheckService: BikecheckService,
    private readonly userService: UserService,
    private readonly chatService: ChatService,
  ) {}

  @UseGuards(AuthApiGuard)
  @Get('general')
  async getGeneralStats(): Promise<GeneralStats> {
    return this.pgPoolService.runInTransaction(async (client) => {
      const bikechecksCount = await this.bikecheckService.getCount(client);
      const usersCount = await this.userService.getCount(client);
      const chatsCount = await this.chatService.getCount(client);

      return new GeneralStats(bikechecksCount, usersCount, chatsCount);
    });
  }
}
