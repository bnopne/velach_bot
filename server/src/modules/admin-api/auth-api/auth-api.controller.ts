import {
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import type { Response } from 'express';
import { add } from 'date-fns';
import { JwtService } from '@nestjs/jwt';

import { AuthApiService } from 'src/modules/admin-api/auth-api/auth-api.service';
import type { JWTPayload } from 'src/modules/admin-api/auth-api/types';
import { ADMIN_SITE_COOKIE_NAME } from 'src/modules/admin-api/auth-api/constants';
import { ConfigurationService } from 'src/modules/configuration/configuration.service';

export class LoginBodyDTO {
  accessCode?: string;
}

@Controller()
export class AuthApiController {
  constructor(
    private readonly authService: AuthApiService,
    private readonly configurationService: ConfigurationService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/login')
  async login(
    @Body() body: LoginBodyDTO,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    const accessCode = body.accessCode;

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
