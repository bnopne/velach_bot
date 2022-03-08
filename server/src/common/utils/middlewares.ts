import { Composer } from 'telegraf';

import { Middleware } from 'src/common/types/bot';

export function composeMiddlewares(middlewares: Middleware[]): Middleware {
  return Composer.compose(middlewares);
}
