import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';

import { PgPoolService } from 'src/modules/pg-pool/pg-pool.service';
import { AuthApiGuard } from 'src/modules/admin-api/auth-api/auth-api.guard';
import { BikecheckService } from 'src/modules/entities/bikecheck/bikecheck.service';

const DEFAULT_LIMIT = 100;
const DEFAULT_OFFSET = 0;

@Controller()
export class BikechecksApiController {
  constructor(
    private readonly bikecheckService: BikecheckService,
    private readonly pgPoolService: PgPoolService,
  ) {}

  @UseGuards(AuthApiGuard)
  @Get('/for-user/:userId')
  async getUserBikechecks(
    @Param() params: { userId: string },
    @Query('limit') limitParam: string,
    @Query('offset') offsetParam: string,
  ) {
    const limit = parseInt(limitParam, 10) || DEFAULT_LIMIT;
    const offset = parseInt(offsetParam, 10) || DEFAULT_OFFSET;

    return (
      await this.pgPoolService.runInTransaction((client) =>
        this.bikecheckService.getAllForUser(
          client,
          params.userId,
          limit,
          offset,
        ),
      )
    ).map((bikecheck) => bikecheck.getDTO());
  }

  @UseGuards(AuthApiGuard)
  @Get('/:bikecheckId')
  async getBikecheck(@Param() params: { bikecheckId: string }) {
    const bikecheck = await this.pgPoolService.runInTransaction((client) =>
      this.bikecheckService.findById(client, params.bikecheckId),
    );

    if (!bikecheck) {
      throw new NotFoundException();
    }

    return bikecheck.getDTO();
  }
}
