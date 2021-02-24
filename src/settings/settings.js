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
  metrics: {
    commandRateTimeWindow: {
      doc: 'How long to count user commands (in seconds)',
      format: Number,
      default: 60 * 60,
      env: 'METRICS_COMMAND_RATE_TIME_WINDOW',
    },
    commandRateUnit: {
      doc: 'Time duration which is used to count mean commands count on (in seconds)',
      format: Number,
      default: 60,
      env: 'METRICS_COMMAND_RATE_UNIT',
    },
    callbackQueryRateTimeWindow: {
      doc: 'How long to count user callback queries (in seconds)',
      format: Number,
      default: 60 * 60,
      env: 'METRICS_CALLBACK_QUERY_RATE_TIME_WINDOW',
    },
    callbackQueryRateUnit: {
      doc: 'Time duration which is used to count mean callback queries count on (in seconds)',
      format: Number,
      default: 60,
      env: 'METRICS_CALLBACK_QUERY_RATE_UNIT',
    },
  },
  bikechecks: {
    maxBikechecksPerUser: {
      doc: 'Maximum bikechecks for one user',
      format: Number,
      default: 10,
      env: 'BIKECHECKS_MAX_BIKECHECKS_PER_USER',
    },
    emptyBikecheckPictureUrl: {
      doc: 'Picture URL to post when user has no more bikechecks',
      format: String,
      default: '',
      env: 'BIKECHECKS_EMPTY_BIKECHECK_PICTURE_URL',
    },
  },
});

settings.validate();

module.exports = settings;
