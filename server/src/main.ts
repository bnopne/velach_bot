import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';

import { MainModule } from 'src/modules/main/main.module';

config();

async function bootstrap() {
  NestFactory.create(MainModule)
    .then((app) => app.listen(3000))
    .catch((err) => {
      console.error(err);
    });
}

bootstrap();
