import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';

import { FeatureAnalyticsService } from 'src/modules/entities/feature-analytics/feature-analytics.service';
import { Context, Middleware, MiddlewareNext } from 'src/common/types/bot';
import { getContextConnectionOrFail } from 'src/common/utils/telegram-context';
import { FEATURE_KEYS } from 'src/modules/entities/feature-analytics/constants';

const logger = new Logger('Feature Analytics Middleware Service');

@Injectable()
export class FeatureAnalyticsMiddlewareService {
  constructor(private featureAnalyticsService: FeatureAnalyticsService) {}

  private async middleware(
    ctx: Context,
    next: MiddlewareNext,
    featureKey: (typeof FEATURE_KEYS)[keyof typeof FEATURE_KEYS],
  ): Promise<void> {
    const client = getContextConnectionOrFail(ctx);

    const chatId = ctx.chat?.id;
    const userId = ctx.from?.id;

    if (!chatId || !userId) {
      return next();
    }

    try {
      await this.featureAnalyticsService.create(
        client,
        featureKey,
        chatId.toString(),
        userId.toString(),
      );
    } catch (err) {
      logger.error(err);
    }

    return next();
  }

  getMiddleware(
    featureKey: (typeof FEATURE_KEYS)[keyof typeof FEATURE_KEYS],
  ): Middleware {
    return (ctx, next) => this.middleware(ctx, next, featureKey);
  }
}
