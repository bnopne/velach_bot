const BaseCommandHandler = require('./base_command_handler');
const ChatAdminAuthProvider = require('../auth_providers').ChatAdminAuthProvider;
const FilePathManager = require('../../file_path_manager');
const TelegramDownloadManager = require('../../telegram_download_manager');

class CheckBikeCommandHandler extends BaseCommandHandler {

  _getCommand() {
    return 'checkbike';
  };

  _getAuthProvider() {
    return new ChatAdminAuthProvider(this._message, this._bot);
  };

  _parseCommandArguments() {
    const result = {
      chat: this._message.getChat(),
      user: null,
      photoId: null
    };

    const reply = this._message.getReplyToMessage();

    if (reply) {
      result.user = reply.getSender();

      const photoSizes = reply.getPhoto();

      if (photoSizes) {
        result.photoId = this._getBiggestPhotoId(photoSizes);
      };

    };

    return result;
  };

  _getBiggestPhotoId(photoSizes) {

    var biggestPhotoId = null;
    var maxWidth = 0;

    for (var i = 0; i < photoSizes.length; i++) {
      if (photoSizes[i].getWidth() > maxWidth) {
        maxWidth = photoSizes[i].getWidth();
        biggestPhotoId = photoSizes[i].getFileId()
      };
    };

    return biggestPhotoId;

  };

  async handle() {

    if (!this._commandArguments.user) {

      await this._bot.sendMessage(
        this._commandArguments.chat.getId(),
        'Ответь кому-нибудь, чтобы подтвердить, что он показал свой велик, пук!'
      );

      return;

    };

    if (!this._commandArguments.photoId) {

      await this._bot.sendMessage(
        this._commandArguments.chat.getId(),
        'Не вижу фотокарточки с велосипедом, пук!'
      );

      return;

    }

    await this._db.chatsAndUsers.makeSureChatAndUserExist(
      this._commandArguments.chat,
      this._commandArguments.user
    );

    const downloadManager = new TelegramDownloadManager(this._bot);

    await downloadManager.downloadBikePhoto(this._commandArguments.photoId);

    await this._db.chatsAndUsers.checkBike(
      this._commandArguments.user.getId(),
      this._commandArguments.chat.getId(),
      this._commandArguments.photoId
    );

    await this._bot.sendMessage(
      this._commandArguments.chat.getId(),
      'Чекнул, кекнул!'
    );

  };

};

module.exports = CheckBikeCommandHandler;
