import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { AuthApiModule } from './auth-api/auth-api.module';
import { UsersApiModule } from './users-api/users-api.module';
import { BikechecksApiModule } from './bikechecks-api/bikechecks-api.module';

@Module({
  imports: [
    AuthApiModule,
    UsersApiModule,
    BikechecksApiModule,
    RouterModule.register([
      {
        path: 'api',
        children: [
          {
            path: 'auth',
            module: AuthApiModule,
          },
          {
            path: 'users',
            module: UsersApiModule,
          },
          {
            path: 'bikechecks',
            module: BikechecksApiModule,
          },
        ],
      },
    ]),
  ],
})
export class AdminApiModule {}
