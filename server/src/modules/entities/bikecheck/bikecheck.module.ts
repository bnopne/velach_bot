import { Module } from '@nestjs/common';

import { BikecheckService } from 'src/modules/entities/bikecheck/bikecheck.service';

@Module({
  providers: [BikecheckService],
  exports: [BikecheckService],
})
export class BikecheckModule {}
