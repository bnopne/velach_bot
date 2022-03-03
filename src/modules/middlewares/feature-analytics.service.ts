import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';

import { FeatureAnalyticsService } from 'src/modules/entities/feature-analytics/feature-analytics.service';
import { Context, Middleware, MiddlewareNext } from 'src/common/types/bot';
import { getContextConnectionOrFail } from 'src/common/utils/context';

const logger = new Logger('Feature Analytics Middleware Service');

@Injectable()
export class FeatureAnalyticsMiddlewareService {
  constructor(private featureAnalyticsService: FeatureAnalyticsService) {}

  private async middleware(
    ctx: Context,
    next: MiddlewareNext,
    feature: string,
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
        feature,
        chatId.toString(),
        userId.toString(),
      );
    } catch (err) {
      logger.error(err);
    } finally {
      return next();
    }
  }

  getMiddleware(feature: string): Middleware {
    return (ctx, next) => this.middleware(ctx, next, feature);
  }
}
