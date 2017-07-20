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
      chat: this._message.getChat(),
      user: null
    };

    const reply = this._message.getReplyToMessage();

    if (reply) {
      result.user = reply.getSender();
    };

    return result;
  };

  async handle() {

    if (!this._commandArguments.user) {

      await this._bot.sendMessage(
        this._commandArguments.chat.getId(),
        'Ответь кому-нибудь, чтобы подтвердить, что он не показал свой велик, пук!'
      );

      return;

    };

    await this._db.chatsAndUsers.makeSureChatAndUserExist(
      this._commandArguments.chat,
      this._commandArguments.user
    );

    await this._db.chatsAndUsers.uncheckBike(
      this._commandArguments.user.getId(),
      this._commandArguments.chat.getId()
    );

    await this._bot.sendMessage(
      this._commandArguments.chat.getId(),
      'Теперь он беспруфный кукарек без велика, кек!'
    );

  };

};

module.exports = UncheckBikeCommandHandler;
