import { Module } from '@nestjs/common';

import { EntitiesModule } from 'src/modules/entities/entities.module';
import { MiddlewaresModule } from 'src/modules/telegram-bot/middlewares/middlewares.module';
import { TemplatesModule } from 'src/modules/telegram-bot/templates/templates.module';
import { AdminPasscodeModule } from 'src/modules/admin-passcode/admin-passcode.module';

import { GetAdminPasscodeService } from './get-admin-passcode.service';

@Module({
  imports: [
    EntitiesModule,
    MiddlewaresModule,
    TemplatesModule,
    AdminPasscodeModule,
  ],
  providers: [GetAdminPasscodeService],
  exports: [GetAdminPasscodeService],
})
export class GetAdminPasscodeModule {}
