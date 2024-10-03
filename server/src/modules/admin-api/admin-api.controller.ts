import {
  Controller,
  Post,
  UnauthorizedException,
  Body,
  Get,
  UseGuards,
  Query,
} from '@nestjs/common';

import { AuthService } from 'src/modules/auth/auth.service';

import { SignInWithPasscodeBody } from './dto/sign-in-with-passcode/body';
import { SignInWithPasscodeResponse } from './dto/sign-in-with-passcode/response';
import { GetChatsResponse } from './dto/get-chats/response';
import { AuthGuard } from '@nestjs/passport';
import { ChatService } from 'src/modules/entities/chat/chat.service';

@Controller('auth')
export class AdminApiController {
  constructor(
    private readonly authService: AuthService,
    private readonly chatService: ChatService,
  ) {}

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
  @Get('chats')
  async getChats(
    @Query('search') search: string,
    @Query('type') type: string,
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ): Promise<GetChatsResponse> {
    const chats = this.chatService.getChats();
    return {
      chats: [],
    };
  }
}
