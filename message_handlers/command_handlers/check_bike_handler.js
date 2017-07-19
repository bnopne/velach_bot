const BaseCommandHandler = require('./base_command_handler');
const ChatAdminAuthProvider = require('../auth_providers').ChatAdminAuthProvider;

class CheckBikeCommandHandler extends BaseCommandHandler {

  _getCommand() {
    return 'check_bike';
  };

  _getAuthProvider() {
    return new ChatAdminAuthProvider(this._message, this._bot);
  };

  _parseCommandArguments() {
    const result = {
      chatId: this._message.chat.id,
      userId: null
    };

    if ('reply_to_message' in this._message) {
      if ('from' in this._message.reply_to_message) {
          result.userId = this._message.reply_to_message.id
      };
    };

    return result;
  };

  async handle() {

    if (this._commandArguments.userId) {

      await this._db.chatsAndUsers.checkBike(
        this._commandArguments.userId,
        this._commandArguments.chatId
      );

      await this._bot.sendMessage(
        this._commandArguments.chatId,
        'Чекнул, кекнул!'
      );

    } else {

      await this._bot.sendMessage(
        this._commandArguments.chatId,
        'Некого чекать, некого кекоть, пук!'
      );

    }

  };

};

module.exports = CheckBikeCommandHandler;
