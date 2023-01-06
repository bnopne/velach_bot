import { Injectable } from '@nestjs/common';
import { PoolConfig } from 'pg';

@Injectable()
export class ConfigurationService {
  readonly poolConfig: PoolConfig;

  readonly telegramBotToken: string;
  readonly maxMessageAge: number; // in seconds

  readonly adminSiteAccessCodeTTL: number; // in seconds
  readonly jwtSecret: string;
  readonly adminSiteHost: string;
  readonly adminSitePort: number;

  constructor() {
    /**
     * DB connection config setup
     */
    this.poolConfig = {
      host: this.getStringValueOrFail('VELACH_BOT_DB_HOST'),
      port: this.getNumberValueOrFail('VELACH_BOT_DB_PORT'),
      database: this.getStringValueOrFail('VELACH_BOT_DB_DATABASE'),
      user: this.getStringValueOrFail('VELACH_BOT_DB_USER'),
      password: this.getStringValueOrFail('VELACH_BOT_DB_PASSWORD'),
      min: this.getNumberValue('VELACH_BOT_DB_MIN_POOL_SIZE', 1),
      max: this.getNumberValue('VELACH_BOT_DB_MAX_POOL_SIZE', 10),
    };

    /**
     * Telegram config setup
     */
    this.telegramBotToken = this.getStringValueOrFail(
      'VELACH_BOT_TELEGRAM_TOKEN',
    );

    /**
     * Maximum message age
     */
    this.maxMessageAge = this.getNumberValue('VELACH_BOT_MAX_MESSAGE_AGE', 60);

    /**
     * Admin site
     */
    this.adminSiteAccessCodeTTL = this.getNumberValue(
      'VELACH_BOT_ADMIN_SITE_ACCESS_CODE_TTL',
      60,
    );
    this.jwtSecret = this.getStringValueOrFail('VELACH_BOT_JWT_SECRET');
    this.adminSiteHost = this.getStringValue(
      'VELACH_BOT_ADMIN_SITE_HOST',
      '127.0.0.1',
    );
    this.adminSitePort = this.getNumberValue(
      'VELACH_BOT_ADMIN_SITE_PORT',
      20000,
    );
  }

  getStringValueOrFail(name: string): string {
    const value = this.getStringValue(name);

    if (!value || typeof value !== 'string') {
      throw new Error(
        `Config parameter '${name}' is not present or has invalid type. Value was ${value}`,
      );
    }

    return value;
  }

  getNumberValueOrFail(name: string): number {
    const value = this.getNumberValue(name);

    if (!value || typeof value !== 'number') {
      throw new Error(
        `Config parameter '${name}' is not present or has invalid type. Value was ${value}`,
      );
    }

    return value;
  }

  getStringValue(name: string): string | undefined;
  getStringValue(name: string, defaultValue: string): string;
  getStringValue(name: string, defaultValue?: string) {
    const value = process.env[name];

    if (value != null) {
      return value;
    }

    if (defaultValue != null) {
      return defaultValue;
    }

    return undefined;
  }

  getNumberValue(name: string): number | undefined;
  getNumberValue(name: string, defaultValue: number): number;
  getNumberValue(name: string, defaultValue?: number): number | undefined {
    const value = process.env[name];

    if (value != null) {
      return parseFloat(value);
    }

    if (defaultValue != null) {
      return defaultValue;
    }

    return undefined;
  }
}
