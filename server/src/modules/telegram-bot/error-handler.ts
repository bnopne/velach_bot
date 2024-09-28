import { TErrorHandler, Context } from 'src/common/types/bot';

export const handlers: TErrorHandler[] = [];

export async function handleError(
  error: unknown,
  context: Context,
): Promise<void> {
  await Promise.all(handlers.map((handler) => handler(error, context)));
}
