import { Module } from '@nestjs/common';

import { AuthModule } from 'src/modules/auth/auth.module';
import { EntitiesModule } from 'src/modules/entities/entities.module';
import { MiddlewaresModule } from 'src/modules/telegram-bot/middlewares/middlewares.module';
import { TemplatesModule } from 'src/modules/telegram-bot/templates/templates.module';

import { GetAdminPasscodeService } from './get-admin-passcode.service';

@Module({
  imports: [AuthModule, TemplatesModule, MiddlewaresModule, EntitiesModule],
  providers: [GetAdminPasscodeService],
  exports: [GetAdminPasscodeService],
})
export class GetAdminPasscodeModule {}
