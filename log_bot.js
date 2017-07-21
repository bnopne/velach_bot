const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');

const bot = new TelegramBot(config.get('telegram:token'));

bot.on('message', message => {
  console.log(message);
});

bot.startPolling();
