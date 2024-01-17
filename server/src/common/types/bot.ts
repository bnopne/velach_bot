import { PoolClient } from 'pg';
import {
  Context as TelegrafContext,
  Middleware as TelegrafMiddleware,
} from 'telegraf';

export class Context extends TelegrafContext {
  database?: {
    connection: PoolClient;
  };
}

export interface ErrorHandler {
  (error: unknown, context: Context): Promise<void>;
}

export interface Handler {
  (context: Context): Promise<any>;
}

export type Middleware = TelegrafMiddleware<Context>;

export type RouteFn = (ctx: Context) => string | number;

export type MiddlewareNext = () => Promise<void>;

export interface IBaseCallbackQueryData {
  c: number;
}
