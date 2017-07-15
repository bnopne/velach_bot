const Db = require('../db');
const MessageHandler = require('../message_handler');

class Bot {

  constructor(pool, telegramBot) {
    this._pool = pool
    this._telegramBot = telegramBot;

    this._telegramBot.on(
      'message',
      this._messageCallback.bind(this)
    );

    this._telegramBot.startPolling();
  };

  async _messageCallback(message) {
    var client = await this._pool.connect();

    await client.query('BEGIN');

    try {

      var db = new Db(client);
      var messageHandler = new MessageHandler(message, db);

      await messageHandler.handleMessage();

      await client.query('COMMIT');

    } catch (err) {

      await client.query('ROLLBACK');

    } finally {

      client.release();

    };

  };

};

module.exports = Bot;
