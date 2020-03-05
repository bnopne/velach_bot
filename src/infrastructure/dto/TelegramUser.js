const DTO = require('../DTO');

class TelegramUser extends DTO {
  get id() {
    return this.getField('id');
  }

  get isBot() {
    return this.getField('is_bot');
  }

  get firstName() {
    return this.getField('first_name');
  }

  get lastName() {
    return this.getField('last_name');
  }

  get username() {
    return this.getField('username');
  }
}

module.exports = TelegramUser;
