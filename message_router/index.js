const messageHandlers = require('../message_handlers');

class MessageRouter {

  constructor(message, bot, db) {
    this._message = message;
    this._bot = bot;
    this._db = db;
  };

  async routeMessage() {

    if ('new_chat_member' in this._message) {
      const handler = new messageHandlers.NewChatMemberHandler(
        this._message,
        this._bot,
        this._db
      );

      await handler.handle();
    };

   };

};

module.exports = MessageRouter;
