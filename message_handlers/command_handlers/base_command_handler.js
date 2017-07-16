const BaseMessageHandler = require('../base_message_handler');

class BaseCommandHandler extends BaseMessageHandler {

  constructor(message, bot, db) {
    super(message, bot, db);

    this._command = this._getCommand();
    this._commandArguments = this._parseCommandArguments();

    this._authProvider = this._getAuthProvider();
  };

  _getCommand() {
    return null;
  };

  _parseCommandArguments() {
    return null;
  };

  _getAuthProvider() {
    return null;
  };

  _wrapHandle(handle) {

    return async () => {
      const chat = this._extractChat();
      const user = this._extractUser();

      await this._db.chatsAndUsers.makeSureChatAndUserExist(chat, user);

      const isUserAuthorized = await this._authProvider.isAuthorized();

      if (isUserAuthorized) {
        await handle.apply(this, []);
      } else {
        await this._bot.sendMessage(this._extractChat().id, 'Unautorized');
      };
    };

  };

};

module.exports = BaseCommandHandler;
