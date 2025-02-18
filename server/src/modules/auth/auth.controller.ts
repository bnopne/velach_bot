import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';

import { PgPoolService } from 'src/modules/pg-pool/pg-pool.service';

import { SignInWithPasscodeBody, SignInWithPasscodeResponse } from './dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly pgPoolService: PgPoolService,
  ) {}

  @Post('/signin-with-passcode')
  async signInWithPasscode(
    @Body(ValidationPipe) body: SignInWithPasscodeBody,
  ): Promise<SignInWithPasscodeResponse> {
    const token = await this.pgPoolService.runInTransaction((client) =>
      this.authService.signInWithAdminPasscode(client, body.passcode),
    );

    return new SignInWithPasscodeResponse(token);
  }
}
