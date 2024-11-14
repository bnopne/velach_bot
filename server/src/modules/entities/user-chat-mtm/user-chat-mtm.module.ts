import { Module } from '@nestjs/common';

import { UserChatMtmService } from './user-chat-mtm.service';

@Module({
  providers: [UserChatMtmService],
  exports: [UserChatMtmService],
})
export class UserChatMtmModule {}
