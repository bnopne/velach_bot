import { Module } from '@nestjs/common';

import { CallbackQueryRouterService } from 'src/modules/telegram-bot/callback-query-router/callback-query-router.service';
import { BikecheckCommandModule } from 'src/modules/telegram-bot/commands/bikecheck/bikecheck-command.module';
import { DeletedCommandModule } from 'src/modules/telegram-bot/commands/deleted/deleted-command.module';
import { OnSaleCommandModule } from 'src/modules/telegram-bot/commands/on-sale/on-sale-command.module';
import { TopCommandModule } from 'src/modules/telegram-bot/commands/top/top-command.module';
import { MyLikesCommandModule } from 'src/modules/telegram-bot/commands/my-likes/my-likes-command.module';

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
