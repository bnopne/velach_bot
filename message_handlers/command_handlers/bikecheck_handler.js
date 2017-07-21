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

    const bikePhotoId = await this._db.chatsAndUsers.getBikePhotoId(
      this._commandArguments.user.getId(),
      this._commandArguments.chat.getId()
    );

    if (!bikePhotoId) {

      await this._bot.sendMessage(
        this._commandArguments.chat.getId(),
        'Этот беспруфный кукарек не показывал свою повозку, пук!'
      );

      return;

    };

    await this._bot.sendPhoto(
      this._commandArguments.chat.getId(),
      bikePhotoId,
      {
        reply_to_message_id: this._message.getId(),
        caption: 'Этот почтенный велан показал свою повозку, кек!'
      }
    );

  };

};

module.exports = BikecheckHandler;
