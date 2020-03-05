const convict = require('convict');

const settings = convict({
  env: {
    doc: 'Application environment',
    format: String,
    default: 'dev',
    env: 'NODE_ENV',
  },
  db: {
    database: {
      doc: 'Database name',
      format: String,
      default: 'velach_bot',
      env: 'DB_DATABASE',
    },
    host: {
      doc: 'Database host',
      format: 'ipaddress',
      default: '127.0.0.1',
      env: 'DB_HOST',
    },
    port: {
      doc: 'Database port',
      format: 'port',
      default: 5432,
      env: 'DB_PORT',
    },
    user: {
      doc: 'Database user',
      format: String,
      default: 'velach_bot',
      env: 'DB_USER',
    },
    password: {
      doc: 'Database password',
      format: String,
      default: 'qwerty',
      env: 'DB_PASSWORD',
    },
    dialect: {
      doc: 'Database dialect',
      format: String,
      default: 'postgres',
      env: 'DB_DIALECT',
    },
  },
  telegram: {
    token: {
      doc: 'Telegram bot token',
      format: String,
      default: '',
      env: 'TELEGRAM_TOKEN',
    },
    messageTTL: {
      doc: 'Bot will ignore messages older than this time (in seconds)',
      format: Number,
      default: 60,
      env: 'TELEGRAM_MESSAGE_TTL',
    },
    proxyUrl: {
      doc: 'Proxy for dealing with RKN Telegram blocks',
      format: String,
      default: '',
      env: 'TELEGRAM_PROXY_URL',
    },
  },
  dropbox: {
    accessToken: {
      doc: 'Dropbox app access token',
      format: String,
      default: '',
      env: 'DROPBOX_ACCESS_TOKEN',
    },
  },
  usage: {
    userCommandExecutionFailTreshold: {
      doc: 'How many times user must wrongly execute command, before help suggestion appears',
      format: Number,
      default: 4,
      env: 'USAGE_USER_COMMAND_EXECUTION_FAIL_TRESHOLD',
    },
    userCommandExecutionFailTrackingTimeWindow: {
      doc: 'How long to track user command execution attempts (in seconds)',
      format: Number,
      default: 60,
      env: 'USAGE_USER_COMMAND_EXECUTION_FAIL_TRACKING_TIME_WINDOW',
    },
  },
});

settings.validate();

module.exports = settings;
