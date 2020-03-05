const DTO = require('../DTO');

const CHAT_TYPES = {
  PRIVATE: 'private',
  GROUP: 'group',
  SUPERGROUP: 'supergroup',
  CHANNEL: 'channel',
};

class TelegramChat extends DTO {
  get id() {
    return this.getField('id');
  }

  get type() {
    return this.getField('type');
  }

  get title() {
    return this.getField('title');
  }

  isPrivate() {
    return this.type === CHAT_TYPES.PRIVATE;
  }

  isGroup() {
    return this.type === CHAT_TYPES.GROUP;
  }

  isSupergroup() {
    return this.type === CHAT_TYPES.SUPERGROUP;
  }

  isChannel() {
    return this.type === CHAT_TYPES.CHANNEL;
  }
}

module.exports = TelegramChat;
