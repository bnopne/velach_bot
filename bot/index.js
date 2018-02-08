const Db = require('../db');
const MessageRouter = require('../message_router');

class Bot {

  constructor(pool, telegramBot) {
    this._pool = pool
    this._telegramBot = telegramBot;

    this._bindEventHandlers();
  };

  start() {
    this._telegramBot.startPolling();
  }

  _bindEventHandlers() {
    this._telegramBot.on(
      'message',
      this._messageCallback.bind(this)
    );
  }

  async _messageCallback(message) {
    var client = await this._pool.connect();

    await client.query('BEGIN');

    try {

      var db = new Db(client);

      var router = new MessageRouter(
        message,
        this._telegramBot,
        db
      );

      await router.routeMessage();

      await client.query('COMMIT');

    } catch (err) {

      console.error(err);
      await client.query('ROLLBACK');

    } finally {

      client.release();

    };

  };

};

module.exports = Bot;
