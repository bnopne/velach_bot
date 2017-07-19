const BaseCommandHandler = require('./base_command_handler');
const ChatAdminAuthProvider = require('../auth_providers').ChatAdminAuthProvider;

class UncheckBikeCommandHandler extends BaseCommandHandler {

  _getCommand() {
    return 'uncheck_bike';
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

      await this._db.chatsAndUsers.uncheckBike(
        this._commandArguments.userId,
        this._commandArguments.chatId
      );

      await this._bot.sendMessage(
        this._commandArguments.chatId,
        'Снова беспруфный кукарек, кек!'
      );

    } else {

      await this._bot.sendMessage(
        this._commandArguments.chatId,
        'Ответь на чье-нибудь сообщение, пук!'
      );

    };

  };

};

module.exports = UncheckBikeCommandHandler;
