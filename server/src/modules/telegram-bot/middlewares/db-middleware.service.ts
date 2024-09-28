import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { type PoolClient } from 'pg';

import { PgPoolService } from 'src/modules/pg-pool/pg-pool.service';
import { Context, TMiddleware, TMiddlewareNext } from 'src/common/types/bot';
import { handlers } from 'src/modules/telegram-bot/error-handler';

const logger = new Logger('DB Middleware Service');

@Injectable()
export class DbMiddlewareService {
  private poolService: PgPoolService;

  constructor(poolService: PgPoolService) {
    this.poolService = poolService;
  }

  private async middleware(
    context: Context,
    next: TMiddlewareNext,
  ): Promise<void> {
    let connection: PoolClient;

    try {
      connection = await this.poolService.getConnection();

      context.database = {
        connection,
      };
    } catch (error) {
      logger.error(error);
      return;
    }

    await connection.query('START TRANSACTION');
    await next();
    await connection.query('COMMIT');

    connection.release();
  }

  getMiddleware(): TMiddleware {
    return this.middleware.bind(this);
  }
}

async function handleError(error: unknown, context: Context): Promise<void> {
  if (context.database?.connection) {
    await context.database.connection.query('ROLLBACK');
    context.database.connection.release();
    logger.error(error);
  }
}

handlers.push(handleError);
