import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PoolClient } from 'pg';

import { getConnection } from 'src/common/database/connection';
import { getConfigModule } from 'src/common/utils/config';
import { Telegram } from 'telegraf';
import { UserFromGetMe } from 'typegram';

export async function getTestingModule(
  providers: Provider<any>[],
  imports: any[] = [],
): Promise<TestingModule> {
  return Test.createTestingModule({
    imports: [getConfigModule(), ...imports],
    providers,
  }).compile();
}

export async function getTestConfigService(
  testingModule: TestingModule,
): Promise<ConfigService> {
  return testingModule.get<ConfigService>(ConfigService);
}

export function getTestConnection(
  testingModule: TestingModule,
): Promise<PoolClient> {
  return getConnection(testingModule.get<ConfigService>(ConfigService));
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
