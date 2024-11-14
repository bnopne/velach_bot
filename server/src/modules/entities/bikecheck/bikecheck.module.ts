import { Module } from '@nestjs/common';

import { BikecheckService } from './bikecheck.service';

@Module({
  providers: [BikecheckService],
  exports: [BikecheckService],
})
export class BikecheckModule {}
