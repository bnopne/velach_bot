import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import { MainModule } from 'src/modules/main/main.module';
import { ConfigurationService } from 'src/modules/configuration/configuration.service';

config();

const logger = new Logger('Bootstrap');

async function bootstrap() {
  NestFactory.create(MainModule)
    .then((app) => {
      const configurationService = app.get(ConfigurationService);

      app.enableCors({ origin: configurationService.allowedHosts });
      app.use(cookieParser());

      return app.listen(configurationService.port, configurationService.host);
    })
    .catch((error) => {
      logger.error(error);
    });
}

bootstrap();
