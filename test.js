const Bot = require('node-telegram-bot-api');

const bot = new Bot('342387136:AAGiuMdiRjsswdkj75-sF14bvF34ZdTmw1k');

bot.on('message', (msg) => {
  console.log(msg);
});

bot.startPolling();
