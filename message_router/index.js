const messageHandlers = require('../message_handlers');

class MessageRouter {

  constructor(message, bot, db) {
    this._message = message;
    this._bot = bot;
    this._db = db;
  };

  _isNewChatMember() {
    return 'new_chat_member' in this._message;
  };

  _isContainText() {
    return 'text' in this._message;
  };

  _tryParseCommand() {
    if (this._isContainText()) {
      if (this._message.text.startsWith('/')) {
        return this._message.text.substring(
          1,
          this._message.text.indexOf(' ')
        );
      };
    };

    return null;
  };

  async routeMessage() {

    if (this._isNewChatMember()) {
      const handler = new messageHandlers.NewChatMemberHandler(
        this._message,
        this._bot,
        this._db
      );

      await handler.handle();
    };

    const command = this._tryParseCommand();

    switch (command) {

      case 'set_greeting': {
        const handler = new messageHandlers.SetGreetingMessageHandler(
          this._message,
          this._bot,
          this._db
        );

        await handler.handle();
      }

    };

   };

};

module.exports = MessageRouter;
