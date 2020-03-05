const DTO = require('../DTO');
const TelegramUser = require('./TelegramUser');
const TelegramMessage = require('./TelegramMessage');
const CallbackQueryData = require('./CallbackData');

class CallbackQuery extends DTO {
  get id() {
    return this.getField('id');
  }

  get from() {
    return this.getNestedDTO('from', TelegramUser);
  }

  get message() {
    return this.getNestedDTO('message', TelegramMessage);
  }

  get inlineMessageId() {
    return this.getField('inline_message_id');
  }

  get chatInstance() {
    return this.getField('chat_instance');
  }

  get data() {
    return CallbackQueryData.deserialize(this.getField('data'));
  }

  get gameShortName() {
    return this.getField('game_short_name');
  }
}

module.exports = CallbackQuery;
