const DTO = require('../DTO');
const TelegramUser = require('./TelegramUser');
const TelegramChat = require('./TelegramChat');
const TelegramMessageEntity = require('./TelegramMessageEntity');
const TelegramPhotoSize = require('./TelegramPhotoSize');


class TelegramMessage extends DTO {
  get messageId() {
    return this.getField('message_id');
  }

  get from() {
    return this.getNestedDTO('from', TelegramUser);
  }

  get date() {
    return this.getField('date');
  }

  get chat() {
    return this.getNestedDTO('chat', TelegramChat);
  }

  get replyToMessage() {
    return this.getNestedDTO('reply_to_message', TelegramMessage);
  }

  get text() {
    return this.getField('text');
  }

  hasEntities() {
    return this.entities.length > 0;
  }

  get entities() {
    return this.getNestedDTOArray('entities', TelegramMessageEntity);
  }

  get photo() {
    return this.getNestedDTOArray('photo', TelegramPhotoSize);
  }

  get biggestPhoto() {
    const photoSizes = this.photo;

    if (!photoSizes) {
      return null;
    }

    const sortedPhotos = photoSizes.sort((a, b) => {
      if (a.width < b.width) {
        return -1;
      }

      if (a.width > b.width) {
        return 1;
      }

      return 0;
    });

    return sortedPhotos[0];
  }

  get newChatMembers() {
    return this.getNestedDTOArray('new_chat_members', TelegramUser);
  }
}


module.exports = TelegramMessage;
