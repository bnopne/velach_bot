import { Provider } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PoolClient } from 'pg';
import { Telegram } from 'telegraf';
import { UserFromGetMe } from 'typegram';
import { config } from 'dotenv';

import { getConnection } from 'src/common/database/connection';
import { ConfigurationService } from 'src/modules/configuration/configuration.service';

export async function getTestingModule(
  providers: Provider<any>[],
  imports: any[] = [],
): Promise<TestingModule> {
  config();

  return Test.createTestingModule({
    imports: [...imports],
    providers,
  }).compile();
}

let configurationService: ConfigurationService;

export function getTestConfigService(): ConfigurationService {
  if (!configurationService) {
    config();
    configurationService = new ConfigurationService();
  }

  return configurationService;
}

export function getTestConnection(): Promise<PoolClient> {
  return getConnection(getTestConfigService().poolConfig);
}

export function getTestTelegram(): Telegram {
  return {
    sendMessage: jest.fn(),
  } as unknown as Telegram;
}

export function getTestBotInfo(
  id = 1,
  first_name = 'test',
  username = 'velach_bot',
): UserFromGetMe {
  return {
    id,
    is_bot: true,
    first_name,
    username,
    can_read_all_group_messages: true,
    supports_inline_queries: true,
    can_join_groups: true,
  };
}
