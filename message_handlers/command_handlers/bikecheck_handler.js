const BaseCommandHandler = require('./base_command_handler');
const NoAuthProvider = require('../auth_providers').NoAuthProvider;

class BikecheckHandler extends BaseCommandHandler {

  _getCommand() {
    return 'bikecheck';
  };

  _getAuthProvider() {
    return new NoAuthProvider(this._message, this._bot);
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
        'Ответь кому-нибудь, чтобы проверить показывал ли он свой велик, пук!'
      );

      return;

    };

    await this._db.chatsAndUsers.makeSureChatAndUserExist(
      this._commandArguments.chat,
      this._commandArguments.user
    );

    const bikeCheck = await this._db.chatsAndUsers.bikeCheck(
      this._commandArguments.user.getId(),
      this._commandArguments.chat.getId()
    );

    const msgText = (bikeCheck)
      ? 'Этот почтенный велан показал свою повозку, кек!'
      : 'Этот беспруфный кукарек не показывал свою повозку, пук!';

    await this._bot.sendMessage(
      this._commandArguments.chat.getId(),
      msgText
    );

  };

};

module.exports = BikecheckHandler;
