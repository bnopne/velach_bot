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

    if (!this._commandArguments.userId) {

      await this._bot.sendMessage(
        this._commandArguments.chatId,
        'Ответь кому-нибудь, чтобы проверить показывал ли он свой велик, пук!'
      );

      return;

    };

    const bikeCheck = await this._db.chatsAndUsers.bikeCheck(
      this._commandArguments.userId,
      this._commandArguments.chatId
    );

    const msgText = (bikeCheck)
      ? 'Этот почтенный велан показал свою повозку, кек!'
      : 'Этот беспруфный кукарек не показывал свою повозку, пук!';

    await this._bot.sendMessage(
      this._commandArguments.chatId,
      msgText
    );

  };

};

module.exports = BikecheckHandler;
