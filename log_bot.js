const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');
const TelegramMessage = require('./telegram_entities/telegram_message');

const bot = new TelegramBot(config.get('telegram:token'));

bot.on('message', message => {
  const msg = new TelegramMessage(message);
  console.log(msg.getCommand());
});

bot.startPolling();
