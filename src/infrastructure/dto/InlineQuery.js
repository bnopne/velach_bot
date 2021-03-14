const DTO = require('../DTO');
const TelegramUser = require('./TelegramUser');

class InlineQuery extends DTO {
  get id() {
    return this.getField('id');
  }

  get from() {
    return this.getNestedDTO('from', TelegramUser);
  }

  get query() {
    return this.getField('query');
  }
}

module.exports = InlineQuery;
