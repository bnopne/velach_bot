import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, PoolClient } from 'pg';

import { Optional } from 'src/common/types/utils';
import { IRunWithPGConnection } from 'src/common/database/connection';

const logger = new Logger('PG Pool Service');

@Injectable()
export class PgPoolService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;
  private configService: ConfigService;

  constructor(configService: ConfigService) {
    this.configService = configService;
  }

  getConnection(): Promise<PoolClient> {
    return this.pool.connect();
  }

  async runInTransaction<T>(
    f: IRunWithPGConnection<T>,
    ...args: any[]
  ): Promise<Optional<T>> {
    const connection = await this.getConnection();

    await connection.query('START TRANSACTION');

    try {
      const result = await f(connection, ...args);
      await connection.query('COMMIT');
      return result;
    } catch (err) {
      logger.error(err);
      await connection.query('ROLLBACK');
    } finally {
      connection.release();
    }
  }

  async runWithoutTransaction<T>(
    f: IRunWithPGConnection<T>,
    ...args: any[]
  ): Promise<Optional<T>> {
    const connection = await this.getConnection();

    try {
      const result = await f(connection, ...args);
      return result;
    } catch (err) {
    } finally {
      connection.release();
    }
  }

  async onModuleInit(): Promise<void> {
    logger.log('Connecting to Postgres...');

    try {
      this.pool = new Pool({
        host: this.configService.get<string>('VELACH_BOT_DB_HOST'),
        port: this.configService.get<number>('VELACH_BOT_DB_PORT'),
        database: this.configService.get<string>('VELACH_BOT_DB_DATABASE'),
        user: this.configService.get<string>('VELACH_BOT_DB_USER'),
        password: this.configService.get<string>('VELACH_BOT_DB_PASSWORD'),
        min: 1,
        max: 10,
      });

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
