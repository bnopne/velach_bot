const messageHandlers = require('../message_handlers');
const TelegramMessage = require('../telegram_entities').TelegramMessage;

class MessageRouter {

  constructor(message, bot, db) {
    this._message = new TelegramMessage(message);
    this._bot = bot;
    this._db = db;
  };

  async routeMessage() {

    const handlers = [
      new messageHandlers.NewChatMemberHandler(this._message, this._bot, this._db),
      new messageHandlers.commandHandlers.SetGreetingMessageHandler(this._message, this._bot, this._db),
      new messageHandlers.commandHandlers.CheckBikeHandler(this._message, this._bot, this._db),
      new messageHandlers.commandHandlers.UncheckBikeHandler(this._message, this._bot, this._db),
      new messageHandlers.commandHandlers.BikecheckHandler(this._message, this._bot, this._db)
    ];

    for (let i = 0; i < handlers.length; i++) {
      if (await handlers[i].fitsMessage()) {
        await handlers[i].handle();
        break;
      };
    };

   };

};

module.exports = MessageRouter;
