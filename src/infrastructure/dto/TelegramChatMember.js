const DTO = require('../DTO');
const TelegramUser = require('./TelegramUser');

class TelegramChatMember extends DTO {
  get user() {
    return this.getNestedDTO('user', TelegramUser);
  }
}

module.exports = TelegramChatMember;
