import { PoolClient } from 'pg';
import { Context as TelegrafContext, MiddlewareFn } from 'telegraf';

export interface Context extends TelegrafContext {
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

export type Middleware = MiddlewareFn<Context>;

export type RouteFn = (ctx: Context) => { route: string } | null;

export type MiddlewareNext = () => Promise<void>;

export interface IBaseCallbackQueryData {
  c: number;
}
