import {
  Controller,
  Post,
  ValidationPipe,
  UsePipes,
  Body,
  Request,
  ClassSerializerInterceptor,
  UseInterceptors,
  UnauthorizedException,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';

import {
  RequestBody,
  ResponseBody,
} from 'src/modules/admin-site/dto/authorize';
import { AdminSiteAuthService } from 'src/modules/admin-site-auth/admin-site-auth.service';

@Controller('admin-site')
export class AdminSiteController {
  constructor(private readonly adminSiteAuthService: AdminSiteAuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('authorize')
  @UsePipes(new ValidationPipe({ transform: true }))
  authorize(
    @Request() request: ExpressRequest,
    @Body() requestBody: RequestBody,
  ): ResponseBody {
    const userId = this.adminSiteAuthService.findUserIdByAccessCode(
      requestBody.accessCode,
    );

    if (!userId) {
      throw new UnauthorizedException();
    }

    this.adminSiteAuthService.revokeAccessCode(requestBody.accessCode);

    return new ResponseBody(this.adminSiteAuthService.generateUserJWT(userId));
  }
}
