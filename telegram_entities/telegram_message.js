const TelegramChat = require('./telegram_chat');
const TelegramUser = require('./telegram_user');

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

  getCommand() {
    const msgText = this.getText();

    if (!msgText) {
      return null;
    };

    if (!msgText.startsWith('/')) {
      return null;
    };

    if (msgText.length < 2) {
      return null;
    };

    return this._message.text.substring(
      1,
      msgText.indexOf(' ')
    );
  };

};

module.exports = TelegramMessage;
