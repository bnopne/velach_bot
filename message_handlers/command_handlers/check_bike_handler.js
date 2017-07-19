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
      chatId: this._message.getChat().getId(),
      userId: null
    };

    const reply = this._message.getReplyToMessage();

    if (reply) {
      result.userId = reply.getSender().getId();
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

    };

  };

};

module.exports = CheckBikeCommandHandler;
