const TelegramUser = require('./telegram_user');

class TelegramMessageEntity {

  constructor(rawMessageEntity) {
    this._rawMessageEntity = rawMessageEntity;
  };

  getType() {
    return this._rawMessageEntity.type;
  };

  isCommand() {
    return this._rawMessageEntity.type === 'bot_command';
  };

  getOffset() {
    return this._rawMessageEntity.offset;
  };

  getLength() {
    return this._rawMessageEntity.length;
  };

  getUrl() {
    return this._rawMessageEntity.url || null;
  };

  getUser() {
    return ('user' in this._rawMessageEntity)
      ? new TelegramUser(this._rawMessageEntity.user)
      : null;
  };

};

module.exports = TelegramMessageEntity;
