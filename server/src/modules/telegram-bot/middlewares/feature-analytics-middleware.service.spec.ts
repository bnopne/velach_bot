import { Context } from 'src/common/types/bot';
import {
  getTestBotInfo,
  getTestingModule,
  getTestTelegram,
} from 'src/common/utils/test-utils';
import { EntitiesModule } from 'src/modules/entities/entities.module';
import { FeatureAnalyticsService } from 'src/modules/entities/feature-analytics/feature-analytics.service';

import { FeatureAnalyticsMiddlewareService } from './feature-analytics-middleware.service';

describe('Test FeatureAnalyticsMiddlewareService', () => {
  let service: FeatureAnalyticsMiddlewareService;
  let entityService: FeatureAnalyticsService;

  beforeEach(async () => {
    const module = await getTestingModule(
      [FeatureAnalyticsMiddlewareService],
      [EntitiesModule],
    );
    service = module.get(FeatureAnalyticsMiddlewareService);
    entityService = module.get(FeatureAnalyticsService);
  });

  test('Middleware calls create in entity service and then calls next', async () => {
    const telegram = getTestTelegram();

    const ctx = new Context(
      {
        update_id: 1,
        message: {
          message_id: 1,
          from: {
            id: 123,
            first_name: 'Test',
            is_bot: false,
          },
          chat: {
            id: 265,
            type: 'private',
            first_name: 'test',
          },
          text: 'test',
          date: Date.now(),
        },
      },
      telegram,
      getTestBotInfo(),
    );

    ctx.database = {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      connection: 'test-conn',
    };

    const next = jest.fn();
    entityService.create = jest.fn();

    await service['middleware'](ctx, next, 'test-feature');

    expect(entityService.create).toBeCalledWith(
      'test-conn',
      'test-feature',
      '265',
      '123',
    );
    expect(next).toBeCalled();
  });
});
