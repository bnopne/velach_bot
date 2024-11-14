import { Module } from '@nestjs/common';

import { BikecheckChatMtmService } from './bikecheck-chat-mtm.service';

@Module({
  providers: [BikecheckChatMtmService],
  exports: [BikecheckChatMtmService],
})
export class BikecheckChatMtmModule {}
