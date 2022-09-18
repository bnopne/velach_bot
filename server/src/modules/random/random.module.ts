import { Module } from '@nestjs/common';

import { RandomService } from './random.service';

@Module({
  providers: [RandomService],
  exports: [RandomService],
})
export class RandomModule {}
