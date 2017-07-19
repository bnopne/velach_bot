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

    return (msgText.indexOf(' ') != -1)
      ? msgText.substring(1, msgText.indexOf(' '))
      : msgText.substring(1);
  };

  getReplyToMessage() {
    return ('reply_to_message' in this._rawMessage)
      ? new TelegramMessage(this._rawMessage.reply_to_message)
      : null;
  };

};

module.exports = TelegramMessage;
