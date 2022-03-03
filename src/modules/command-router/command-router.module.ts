import { Module } from '@nestjs/common';

import { CommandRouterService } from 'src/modules/command-router/command-router.service';
import { HelpCommandModule } from 'src/modules/commands/help/help-command.module';
import { BikecheckCommandModule } from 'src/modules/commands/bikecheck/bikecheck-command.module';
import { CheckbikeCommandModule } from 'src/modules/commands/checkbike/checkbike-command.module';
import { SetStravaCommandModule } from 'src/modules/commands/set-strava/set-strava-command.module';
import { DeletedCommandModule } from 'src/modules/commands/deleted/deleted-command.module';
import { StartCommandModule } from 'src/modules/commands/start/start-command.module';
import { OnSaleCommandModule } from 'src/modules/commands/on-sale/on-sale-command.module';
import { TopCommandModule } from 'src/modules/commands/top/top-command.module';
import { MyLikesCommandModule } from 'src/modules/commands/my-likes/my-likes-command.module';

@Module({
  imports: [
    BikecheckCommandModule,
    DeletedCommandModule,
    HelpCommandModule,
    CheckbikeCommandModule,
    SetStravaCommandModule,
    StartCommandModule,
    OnSaleCommandModule,
    TopCommandModule,
    MyLikesCommandModule,
  ],
  providers: [CommandRouterService],
  exports: [CommandRouterService],
})
export class CommandRouterModule {}
