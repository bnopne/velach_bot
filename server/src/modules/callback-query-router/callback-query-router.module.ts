import { Module } from '@nestjs/common';

import { CallbackQueryRouterService } from 'src/modules/callback-query-router/callback-query-router.service';
import { BikecheckCommandModule } from 'src/modules/commands/bikecheck/bikecheck-command.module';
import { DeletedCommandModule } from 'src/modules/commands/deleted/deleted-command.module';
import { OnSaleCommandModule } from 'src/modules/commands/on-sale/on-sale-command.module';
import { TopCommandModule } from 'src/modules/commands/top/top-command.module';
import { MyLikesCommandModule } from 'src/modules/commands/my-likes/my-likes-command.module';

@Module({
  imports: [
    BikecheckCommandModule,
    DeletedCommandModule,
    OnSaleCommandModule,
    TopCommandModule,
    MyLikesCommandModule,
  ],
  providers: [CallbackQueryRouterService],
  exports: [CallbackQueryRouterService],
})
export class CallbackQueryRouterModule {}
