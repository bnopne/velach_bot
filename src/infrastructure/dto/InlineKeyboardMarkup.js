const DTO = require('../DTO');
const InlineKeyboardButton = require('./InlineKeyboardButton');

class InlineKeyboardMarkup extends DTO {
  static createFromButtonRows(buttonRows) {
    const markup = new this();
    markup.inlineKeyboard = [...buttonRows];
    return markup;
  }

  get inlineKeyboard() {
    return this.getNestedDTOArray('inline_keyboard', InlineKeyboardButton);
  }

  set inlineKeyboard(value) {
    this.setNestedDTOArray('inline_keyboard', value);
  }
}

module.exports = InlineKeyboardMarkup;
