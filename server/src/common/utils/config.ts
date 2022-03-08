import { join } from 'path';

import { DynamicModule, INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';

let app: INestApplication;
let configModule: DynamicModule;

export function getConfigModule(): DynamicModule {
  if (!configModule) {
    configModule = ConfigModule.forRoot({
      envFilePath: join(process.cwd(), '.env'),
    });
  }

  return configModule;
}

export async function getConfigService(): Promise<ConfigService> {
  if (!app) {
    app = await NestFactory.create(getConfigModule(), { logger: false });
  }

  return app.get(ConfigService);
}
