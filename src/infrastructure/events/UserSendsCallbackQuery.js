const Event = require('./Event');
const { EVENT_TYPES } = require('./constants');

class UserSendsCallbackQuery extends Event {
  constructor(userId) {
    super(EVENT_TYPES.USER_EXECUTES_COMMAND);
    this.userId = userId;
  }
}

module.exports = UserSendsCallbackQuery;
