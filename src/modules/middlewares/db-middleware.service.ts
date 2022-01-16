import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';

import { PgPoolService } from 'src/modules/pg-pool/pg-pool.service';
import { Context, Middleware, MiddlewareNext } from 'src/common/types/bot';
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
    next: MiddlewareNext,
  ): Promise<void> {
    let connection;

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

  getMiddleware(): Middleware {
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
