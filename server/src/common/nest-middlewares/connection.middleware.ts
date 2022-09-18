import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { PgPoolService } from 'src/modules/pg-pool/pg-pool.service';

const logger = new Logger('Nest DB Connection Middleware');

@Injectable()
export class ConnectionMiddleware implements NestMiddleware {
  constructor(private readonly pgPoolService: PgPoolService) {}

  async use(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      request.dbConnection = await this.pgPoolService.getConnection();
    } catch (error) {
      logger.error(error);
      response.status(500).end();
      return;
    }

    next();
  }
}
