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
        const handler = new messageHandlers.SetGreetingMessageHandler(
          this._message,
          this._bot,
          this._db
        );

        await handler.handle();
        break;
      }

      case 'check_bike': {
        const handler = new messageHandlers.CheckBikeHandler(
          this._message,
          this._bot,
          this._db
        );

        await handler.handle();
        break;
      }

      case 'get_bikecheck_list': {
        const handler = new messageHandlers.GetBikecheckListHandler(
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
