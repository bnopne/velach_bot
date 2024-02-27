import { Controller, Query, Get, UseGuards } from '@nestjs/common';

import { AuthApiGuard } from 'src/modules/admin-api/auth-api/auth-api.guard';
import { UserService } from 'src/modules/entities/user/user.service';
import { PgPoolService } from 'src/modules/pg-pool/pg-pool.service';

const DEFAULT_LIMIT = 100;
const DEFAULT_OFFSET = 0;

@Controller()
export class UsersApiController {
  constructor(
    private readonly userService: UserService,
    private readonly pgPoolService: PgPoolService,
  ) {}

  @UseGuards(AuthApiGuard)
  @Get()
  async getUsers(
    @Query('limit') limitParam: string,
    @Query('offset') offsetParam: string,
    @Query('search') search: string,
  ) {
    const limit = parseInt(limitParam, 10) || DEFAULT_LIMIT;
    const offset = parseInt(offsetParam, 10) || DEFAULT_OFFSET;

    const users = await this.pgPoolService.runInTransaction((client) =>
      this.userService.getUsersList(client, limit, offset, search),
    );

    return users.map((user) => user.getDTO());
  }
}
