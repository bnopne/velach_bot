const messageHandlers = require('../message_handlers');
const TelegramMessage = require('../telegram_entities').TelegramMessage;

class MessageRouter {

  constructor(message, bot, db) {
    this._message = new TelegramMessage(message);
    this._bot = bot;
    this._db = db;
  };

  async routeMessage() {

    if (this._message.getNewChatMember()) {
      const handler = new messageHandlers.NewChatMemberHandler(
        this._message,
        this._bot,
        this._db
      );

      await handler.handle();
    };

    const command = this._message.getCommand();

    switch (command) {

      case 'set_greeting': {
        const handler = new messageHandlers.commandHandlers.SetGreetingMessageHandler(
          this._message,
          this._bot,
          this._db
        );

        await handler.handle();
        break;
      }

      case 'check_bike': {
        const handler = new messageHandlers.commandHandlers.CheckBikeHandler(
          this._message,
          this._bot,
          this._db
        );

        await handler.handle();
        break;
      }

      case 'uncheck_bike': {
        const handler = new messageHandlers.commandHandlers.UncheckBikeHandler(
          this._message,
          this._bot,
          this._db
        );

        await handler.handle();
        break;
      }

      case 'bikecheck': {
        const handler = new messageHandlers.commandHandlers.BikecheckHandler(
          this._message,
          this._bot,
          this._db
        );

        await handler.handle();
        break;
      }

    };

   };

};

module.exports = MessageRouter;
