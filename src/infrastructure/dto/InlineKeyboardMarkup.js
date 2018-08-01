const DTO = require('../DTO');
const InlineKeyboardButton = require('./InlineKeyboardButton');


class InlineKeyboardMarkup extends DTO {
  static createFromButtons(buttons) {
    const markup = new this();
    markup.inlineKeyboard = [buttons];
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
