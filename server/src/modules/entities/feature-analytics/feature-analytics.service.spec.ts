import { TestingModule } from '@nestjs/testing';
import { PoolClient } from 'pg';

import { disconnect } from 'src/common/database/connection';
import {
  getTestConnection,
  getTestingModule,
} from 'src/common/utils/test-utils';

import { FeatureAnalyticsService } from './feature-analytics.service';

describe('Test FeatureAnalyticsService', () => {
  let service: FeatureAnalyticsService;
  let client: PoolClient;

  beforeEach(async () => {
    const module: TestingModule = await getTestingModule([
      FeatureAnalyticsService,
    ]);
    service = module.get<FeatureAnalyticsService>(FeatureAnalyticsService);
    client = await getTestConnection(module);
    await client.query('START TRANSACTION');
  });

  afterEach(async () => {
    await client.query('ROLLBACK');
    client.release();
  });

  afterAll(async () => {
    await disconnect();
  });

  test('create() creates entry', async () => {
    let rows = await client.query('SELECT * FROM "FeatureAnalytics"');
    expect(rows.rowCount).toBe(0);

    await service.create(client, 'test-feature', '1', '1');

    rows = await client.query('SELECT * FROM "FeatureAnalytics"');
    expect(rows.rowCount).toBe(1);
  });
});
