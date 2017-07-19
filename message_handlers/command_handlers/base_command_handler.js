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
      await this._db.chatsAndUsers.makeSureChatAndUserExist(
        this._message.getChat(),
        this._message.getSender()
      );

      const isUserAuthorized = await this._authProvider.isAuthorized();

      if (isUserAuthorized) {

        await handle.apply(this, []);

      } else {

        await this._bot.sendMessage(
          this._message.getChat().getId(),
          'Unautorized'
        );

      };
    };

  };

  async fitsMessage() {
    const command = this._message.getCommand();

    if (command === null) {
      return false;
    };

    return command == this._getCommand();
  };

};

module.exports = BaseCommandHandler;
