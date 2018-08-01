const DTO = require('../DTO');
const TelegramUser = require('./TelegramUser');


class TelegramMessageEntity extends DTO {
  get type() {
    return this.getField('type');
  }

  get offset() {
    return this.getField('offset');
  }

  get length() {
    return this.getField('length');
  }

  get url() {
    return this.getField('url');
  }

  get user() {
    return this.getNestedDTO('user', TelegramUser);
  }
}


module.exports = TelegramMessageEntity;
