import { Module } from '@nestjs/common';

import { UserChatMtmService } from 'src/modules/entities/user-chat-mtm/user-chat-mtm.service';

@Module({
  providers: [UserChatMtmService],
  exports: [UserChatMtmService],
})
export class UserChatMtmModule {}
