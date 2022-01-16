import { Module } from '@nestjs/common';

import { CallbackQueryRouterService } from 'src/modules/callback-query-router/callback-query-router.service';
import { BikecheckCommandModule } from 'src/modules/commands/bikecheck/bikecheck-command.module';
import { DeletedCommandModule } from 'src/modules/commands/deleted/deleted-command.module';
import { OnSaleCommandModule } from 'src/modules/commands/on-sale/on-sale-command.module';
import { TopCommandModule } from 'src/modules/commands/top/top-command.module';

@Module({
  imports: [
    BikecheckCommandModule,
    DeletedCommandModule,
    OnSaleCommandModule,
    TopCommandModule,
  ],
  providers: [CallbackQueryRouterService],
  exports: [CallbackQueryRouterService],
})
export class CallbackQueryRouterModule {}
