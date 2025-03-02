import {
  Controller,
  Get,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';

import { AuthGuard } from 'src/modules/auth/auth.guard';
import { ChatService } from 'src/modules/entities/chat/chat.service';
import { PgPoolService } from 'src/modules/pg-pool/pg-pool.service';

import { ChatDto } from './dto/get-chats';

@Controller()
export class AdminApiController {
  constructor(
    private readonly chatService: ChatService,
    private readonly pgPoolService: PgPoolService,
  ) {}

  @Get('chats')
  @UseGuards(AuthGuard)
  async getChats(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('offset', ParseIntPipe) offset: number,
    @Query('chat-type') chatType?: string,
  ) {
    const chats = await this.pgPoolService.runInTransaction((client) =>
      this.chatService.getChats(client, { limit, offset, chatType }),
    );
    return chats.map((chat) => ChatDto.fromEntity(chat));
  }
}
