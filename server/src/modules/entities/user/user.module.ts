import { Module } from '@nestjs/common';

import { UserService } from 'src/modules/entities/user/user.service';

@Module({
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
