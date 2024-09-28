import { Composer } from 'telegraf';

import { TMiddleware } from 'src/common/types/bot';

export function composeMiddlewares(middlewares: TMiddleware[]): TMiddleware {
  return Composer.compose(middlewares);
}
