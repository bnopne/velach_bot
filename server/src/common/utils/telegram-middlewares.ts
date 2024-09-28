import { Composer } from 'telegraf';

import { type TMiddleware } from 'src/common/types/bot';

export function composeMiddlewares(middlewares: TMiddleware[]): TMiddleware {
  return Composer.compose(middlewares);
}
