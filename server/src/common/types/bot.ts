import { type PoolClient } from 'pg';
import {
  Context as TelegrafContext,
  type Middleware as TelegrafMiddleware,
} from 'telegraf';

export class Context extends TelegrafContext {
  database?: {
    connection: PoolClient;
  };
}

export type TErrorHandler = {
  (error: unknown, context: Context): Promise<void>;
};

export type THandler = {
  (context: Context): Promise<any>;
};

export type TMiddleware = TelegrafMiddleware<Context>;

export type TRouteFn = (ctx: Context) => string | number;

export type TMiddlewareNext = () => Promise<void>;

export type TBaseCallbackQueryData = {
  c: number;
};
