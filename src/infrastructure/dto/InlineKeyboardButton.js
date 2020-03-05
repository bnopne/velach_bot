const DTO = require('../DTO');

class InlineKeyboardButton extends DTO {
  static createWithCallbackData(text, callbackData) {
    const button = new this();
    button.text = text;
    button.callbackData = callbackData;
    return button;
  }

  get text() {
    return this.getField('text');
  }

  set text(value) {
    this.setField('text', value);
  }

  get url() {
    return this.getField('url');
  }

  set url(value) {
    this.setField('url', value);
  }

  get callbackData() {
    return this.getField('callback_data');
  }

  set callbackData(data) {
    return this.setField('callback_data', data.serialize());
  }
}

module.exports = InlineKeyboardButton;
