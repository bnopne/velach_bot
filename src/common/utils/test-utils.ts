import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PoolClient } from 'pg';

import { getConnection } from 'src/common/database/connection';
import { getConfigModule } from 'src/common/utils/config';

export async function getTestingModule(
  providers: Provider<any>[],
): Promise<TestingModule> {
  return Test.createTestingModule({
    imports: [getConfigModule()],
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
