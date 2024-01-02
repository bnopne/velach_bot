import {
  Controller,
  Get,
  Query,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import type { Response } from 'express';
import { add } from 'date-fns';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from 'src/modules/auth/auth.service';
import type { JWTPayload } from 'src/modules/auth/types';
import { ADMIN_SITE_COOKIE_NAME } from 'src/modules/auth/constants';
import { ConfigurationService } from 'src/modules/configuration/configuration.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configurationService: ConfigurationService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('/verify-access-code')
  async verifyAccessCode(
    @Query('access-code') accessCode: string | undefined,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    if (!accessCode) {
      throw new UnauthorizedException();
    }

    const userId = this.authService.findUserIdByAccessCode(accessCode);

    if (!userId) {
      throw new UnauthorizedException();
    }

    this.authService.revokeAccessCode(accessCode);

    const payload: JWTPayload = { userId };
    const token = await this.jwtService.signAsync(payload);

    response.cookie(ADMIN_SITE_COOKIE_NAME, token, {
      httpOnly: true,
      expires: add(new Date(), {
        seconds: this.configurationService.adminSiteTokenTTL,
      }),
    });
  }
}
