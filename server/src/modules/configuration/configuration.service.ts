import { Injectable } from '@nestjs/common';
import { PoolConfig } from 'pg';

@Injectable()
export class ConfigurationService {
  readonly poolConfig: PoolConfig;

  readonly telegramBotToken: string;
  readonly maxMessageAge: number; // in seconds

  readonly adminSiteAccessCodeTTL: number; // in seconds
  readonly adminSiteTokenTTL: number; // in seconds
  readonly adminSiteHost: string;

  readonly port: number;
  readonly host: string;

  readonly allowedHosts: string[];

  readonly JWTSecret: string;

  readonly taskInterval: number;

  constructor() {
    /**
     * DB connection config setup
     */
    this.poolConfig = {
      host: this.getStringValue('VELACH_BOT_DB_HOST', '127.0.0.1'),
      port: this.getNumberValue('VELACH_BOT_DB_PORT', 5432),
      database: this.getStringValue('VELACH_BOT_DB_DATABASE', 'velach_bot'),
      user: this.getStringValue('VELACH_BOT_DB_USER', 'velach_bot'),
      password: this.getStringValue('VELACH_BOT_DB_PASSWORD', 'pass'),
      min: this.getNumberValue('VELACH_BOT_DB_MIN_POOL_SIZE', 1),
      max: this.getNumberValue('VELACH_BOT_DB_MAX_POOL_SIZE', 10),
    };

    /**
     * Telegram config setup
     */
    this.telegramBotToken = this.getStringValue(
      'VELACH_BOT_TELEGRAM_TOKEN',
      'telegram-bot-token',
    );

    /**
     * Maximum message age
     */
    this.maxMessageAge = this.getNumberValue('VELACH_BOT_MAX_MESSAGE_AGE', 60);

    /**
     * Admin Site
     */
    this.adminSiteAccessCodeTTL = this.getNumberValue(
      'VELACH_BOT_ADMIN_SITE_ACCESS_CODE_TTL',
      5 * 60 * 1000,
    );
    this.adminSiteTokenTTL = this.getNumberValue(
      'VELACH_BOT_ADMIN_SITE_TOKEN_TTL',
      60 * 60 * 1000,
    );
    this.adminSiteHost = this.getStringValue(
      'VELACH_BOT_ADMIN_SITE_HOST',
      'http://127.0.0.1:8080',
    );

    /**
     * Listen config
     */
    this.host = this.getStringValue('VELACH_BOT_HOST', '127.0.0.1');
    this.port = this.getNumberValue('VELACH_BOT_PORT', 8080);

    /**
     * CORS config
     */
    this.allowedHosts = this.getStringValue(
      'VELACH_BOT_ALLOWED_HOSTS',
      'http://localhost:8080',
    )
      .split(',')
      .filter(Boolean);

    /**
     * JWT
     */
    this.JWTSecret = this.getStringValue('VELACH_BOT_JWT_SECRET', 'secret');

    /**
     * Task Queue
     */
    this.taskInterval = this.getNumberValue('VELACH_BOT_TASK_INTERVAL', 1000); // milliseconds
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
