import { Module } from '@nestjs/common';

import { BikecheckChatMtmService } from 'src/modules/entities/bikecheck-chat-mtm/bikecheck-chat-mtm.service';

@Module({
  providers: [BikecheckChatMtmService],
  exports: [BikecheckChatMtmService],
})
export class BikecheckChatMtmModule {}
