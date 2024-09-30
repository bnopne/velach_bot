import {
  Controller,
  Post,
  UnauthorizedException,
  Body,
  Get,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from 'src/modules/auth/auth.service';
import { AuthGuard } from 'src/modules/auth/auth.guard';

import { SignInWithPasscodeBody } from './dto/sign-in-with-passcode.body';
import { SignInWithPasscodeResponse } from './dto/sign-in-with-passcode.response';

@Controller('auth')
export class AdminApiController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in-with-passcode')
  async signInWithPasscode(
    @Body() body: SignInWithPasscodeBody,
  ): Promise<SignInWithPasscodeResponse> {
    let jwt: string;

    try {
      jwt = await this.authService.signInWithPasscode(body.passcode);
    } catch (err) {
      throw new UnauthorizedException();
    }

    return new SignInWithPasscodeResponse(jwt);
  }

  @UseGuards(AuthGuard)
  @Get('test')
  async test() {
    return 'test';
  }
}
