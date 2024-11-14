import { Module } from '@nestjs/common';

import { BikecheckVoteService } from './bikecheck-vote.service';

@Module({
  providers: [BikecheckVoteService],
  exports: [BikecheckVoteService],
})
export class BikecheckVoteModule {}
