import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { MainModule } from 'src/modules/main/main.module';
import { ConfigurationService } from 'src/modules/configuration/configuration.service';

config();

const logger = new Logger('Bootstrap');

async function bootstrap() {
  NestFactory.create(MainModule)
    .then((app) => {
      const configurationService = app.get(ConfigurationService);

      return app.listen(
        configurationService.adminSitePort,
        configurationService.adminSiteHost,
      );
    })
    .catch((err) => {
      logger.error(err);
    });
}

bootstrap();
