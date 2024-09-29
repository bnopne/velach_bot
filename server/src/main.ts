import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { MainModule } from 'src/modules/main/main.module';
import { ConfigurationService } from 'src/modules/configuration/configuration.service';

config();

const logger = new Logger('Bootstrap');

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  app.useGlobalPipes(new ValidationPipe());

  const configurationService = app.get(ConfigurationService);

  try {
    await app.listen(configurationService.port);
  } catch (err) {
    logger.error(err);
  }
}

bootstrap();
