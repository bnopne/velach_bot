import { Module } from '@nestjs/common';

import { ChatService } from 'src/modules/entities/chat/chat.service';

@Module({
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
