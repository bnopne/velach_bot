import { Module } from '@nestjs/common';

import { BikecheckVoteService } from 'src/modules/entities/bikecheck-vote/bikecheck-vote.service';

@Module({
  providers: [BikecheckVoteService],
  exports: [BikecheckVoteService],
})
export class BikecheckVoteModule {}
