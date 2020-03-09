const Event = require('./Event');
const { EVENT_TYPES } = require('./constants');

class UserExecutesCommand extends Event {
  constructor(command, userId, chatId) {
    super(EVENT_TYPES.USER_EXECUTES_COMMAND);
    this.command = command;
    this.userId = userId;
    this.chatId = chatId;
  }
}

module.exports = UserExecutesCommand;
