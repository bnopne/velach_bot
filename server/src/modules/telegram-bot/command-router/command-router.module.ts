import { Module } from '@nestjs/common';

import { CommandRouterService } from 'src/modules/telegram-bot/command-router/command-router.service';
import { HelpCommandModule } from 'src/modules/telegram-bot/commands/help/help-command.module';
import { BikecheckCommandModule } from 'src/modules/telegram-bot/commands/bikecheck/bikecheck-command.module';
import { CheckbikeCommandModule } from 'src/modules/telegram-bot/commands/checkbike/checkbike-command.module';
import { SetStravaCommandModule } from 'src/modules/telegram-bot/commands/set-strava/set-strava-command.module';
import { DeletedCommandModule } from 'src/modules/telegram-bot/commands/deleted/deleted-command.module';
import { StartCommandModule } from 'src/modules/telegram-bot/commands/start/start-command.module';
import { OnSaleCommandModule } from 'src/modules/telegram-bot/commands/on-sale/on-sale-command.module';
import { TopCommandModule } from 'src/modules/telegram-bot/commands/top/top-command.module';
import { MyLikesCommandModule } from 'src/modules/telegram-bot/commands/my-likes/my-likes-command.module';
import { GetAdminPasscodeModule } from 'src/modules/telegram-bot/commands/get-admin-passcode/get-admin-passcode.module';

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
    GetAdminPasscodeModule,
  ],
  providers: [CommandRouterService],
  exports: [CommandRouterService],
})
export class CommandRouterModule {}
