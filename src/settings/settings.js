const convict = require('convict');


const settings = convict({
  env: {
    doc: 'Application environment',
    format: String,
    default: 'dev',
    env: 'NODE_ENV',
  },
  db: {
    connectionString: {
      doc: 'Database connection string',
      format: String,
      default: 'postgres://velach_bot:qwerty@localhost:5432/velach_bot',
      env: 'DB_CONNECTION_STRING',
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
  },
});

settings.validate();


module.exports = settings;
