const Event = require('./Event');
const { EVENT_TYPES } = require('./constants');

class UserInteracts extends Event {
  constructor(userId, chatId) {
    super(EVENT_TYPES.USER_INTERACTS);
    this.userId = userId;
    this.chatId = chatId;
  }
}

module.exports = UserInteracts;
