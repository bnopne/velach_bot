class Bot {

  constructor(pool, telegramBot) {
    this._pool = pool
    this._telegramBot = telegramBot;

    this._telegramBot.on(
      'message',
      this._handleMessage.bind(this)
    );

    this._telegramBot.startPolling();
  };

  async _handleMessage(message) {
    console.log('i am handling!');
  };

};

module.exports = Bot;
