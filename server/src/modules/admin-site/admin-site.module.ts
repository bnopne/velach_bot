import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { PgPoolModule } from 'src/modules/pg-pool/pg-pool.module';
import { ConnectionMiddleware } from 'src/common/nest-middlewares/connection.middleware';
import { ConfigurationModule } from 'src/modules/configuration/configuration.module';
import { EntitiesModule } from 'src/modules/entities/entities.module';
import { AdminSiteController } from 'src/modules/admin-site/admin-site.controller';
import { AdminSiteAuthModule } from 'src/modules/admin-site-auth/admin-site-auth.module';

@Module({
  imports: [
    PgPoolModule,
    EntitiesModule,
    ConfigurationModule,
    AdminSiteAuthModule,
  ],
  controllers: [AdminSiteController],
})
export class AdminSiteModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ConnectionMiddleware).forRoutes(AdminSiteController);
  }
}
