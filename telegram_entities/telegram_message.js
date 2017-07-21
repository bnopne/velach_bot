const TelegramChat = require('./telegram_chat');
const TelegramUser = require('./telegram_user');
const TelegramMessageEntity = require('./telegram_message_entity');
const TelegramPhotoSize = require('./telegram_photo_size');

class TelegramMessage {

  constructor(rawMessage) {
    this._rawMessage = rawMessage;
  };

  getSender() {
    return ('from' in this._rawMessage)
      ? new TelegramUser(this._rawMessage.from)
      : null;
  };

  getChat() {
    return new TelegramChat(this._rawMessage.chat);
  };

  getText() {
    return ('text' in this._rawMessage)
      ? this._rawMessage.text
      : null;
  };

  getNewChatMember() {
    return ('new_chat_member' in this._rawMessage)
      ? new TelegramUser(this._rawMessage.new_chat_member)
      : null;
  };

  getEntities() {
    return ('entities' in this._rawMessage)
      ? this._rawMessage.entities.map((el, i, arr) => {
          return new TelegramMessageEntity(el);
        })
      : [];
  };

  getCommand() {

    const entities = this.getEntities();

    const commandEntities = entities.filter((el, i, arr) => {
      return el.isCommand();
    });

    for (var i = 0; i < commandEntities.length; i++) {
      let commandEntity = commandEntities[i];

      if (commandEntity.getOffset() == 0) {

        return this.getText().substring(
          commandEntity.getOffset(),
          commandEntity.getLength()
        )
          .slice(1)
          .split('@');

      };
    };

    return null;

  };

  getReplyToMessage() {
    return ('reply_to_message' in this._rawMessage)
      ? new TelegramMessage(this._rawMessage.reply_to_message)
      : null;
  };

  getPhoto() {
    if ('photo' in this._rawMessage) {
      return this._rawMessage.photo.map(rawPhotoSize => {
        return new TelegramPhotoSize(rawPhotoSize);
      });
    } else {
      return null;
    };
  };

};

module.exports = TelegramMessage;
