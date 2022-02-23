import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, PoolClient } from 'pg';

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
