import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { Pool, type PoolClient } from 'pg';

import { ConfigurationService } from 'src/modules/configuration/configuration.service';

const logger = new Logger('PG Pool Service');

@Injectable()
export class PgPoolService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;
  private configurationService: ConfigurationService;

  constructor(configService: ConfigurationService) {
    this.configurationService = configService;
  }

  getConnection(): Promise<PoolClient> {
    return this.pool.connect();
  }

  async runInTransaction<R>(func: (client: PoolClient) => Promise<R>) {
    const client = await this.getConnection();

    await client.query('START TRANSACTION');

    try {
      const result = await func(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    }
  }

  async onModuleInit(): Promise<void> {
    logger.log('Connecting to Postgres...');

    try {
      this.pool = new Pool(this.configurationService.poolConfig);
      logger.log('Connected to Postgres');
    } catch (err) {
      logger.error(err);
    }
  }

  async onModuleDestroy(): Promise<void> {
    logger.log('Wait for PG clients to disconnect');

    try {
      await this.pool.end();
    } catch (err) {
      logger.error(err);
    }

    logger.log('PG Pool successfully disconnected');
  }
}
