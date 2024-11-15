import {
  Body,
  Controller,
  Get,
  Post,
  ValidationPipe,
  Req,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { PoolClient } from 'pg';

import { AuthService } from 'src/modules/auth/auth.service';
import { PgPoolService } from 'src/modules/pg-pool/pg-pool.service';
import { UserService } from 'src/modules/entities/user/user.service';
import { AuthorizedRequest } from 'src/common/types/request';
import { AuthGuard } from 'src/modules/auth/auth.guard';

import {
  SignInWithPassodeBody,
  SignInWithPassodeResponse,
} from './dto/sign-in-with-passcode';
import { GetMeResponse } from './dto/get-me';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly pgPoolService: PgPoolService,
    private readonly userService: UserService,
  ) {}

  @Post('sign-in-with-passcode')
  async signInWithPasscode(
    @Body(ValidationPipe) body: SignInWithPassodeBody,
  ): Promise<SignInWithPassodeResponse> {
    const token = await this.pgPoolService.runInTransaction(
      (client: PoolClient) =>
        this.authService.signInWithPassode(client, body.passcode),
    );

    return new SignInWithPassodeResponse(token);
  }

  @Get('get-me')
  @UseGuards(AuthGuard)
  async getMe(@Req() request: AuthorizedRequest): Promise<GetMeResponse> {
    const user = await this.pgPoolService.runInTransaction(
      async (client: PoolClient) =>
        this.userService.findById(client, request.jwtPayload.userId),
    );

    if (!user) {
      throw new NotFoundException();
    }

    return new GetMeResponse(
      user.id,
      user.username ?? undefined,
      user.firstName ?? undefined,
      user.lastName ?? undefined,
      user.isBot ?? undefined,
      user.stravaLink ?? undefined,
    );
  }
}
