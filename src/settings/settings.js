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
      default: '342387136:AAGiuMdiRjsswdkj75-sF14bvF34ZdTmw1k',
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
});

settings.validate();

module.exports = settings;
