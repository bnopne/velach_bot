import { Module } from '@nestjs/common';

import { AdminSiteAccessService } from 'src/modules/entities/admin-site-access/admin-site-access.service';

@Module({
  providers: [AdminSiteAccessService],
  exports: [AdminSiteAccessService],
})
export class AdminSiteAccessModule {}
