import { Module } from '@nestjs/common';

import { InMemoryStorageService } from 'src/modules/in-memory-storage/in-memory-storage.service';

@Module({
  providers: [InMemoryStorageService],
  exports: [InMemoryStorageService],
})
export class InMemoryStorageModule {}
