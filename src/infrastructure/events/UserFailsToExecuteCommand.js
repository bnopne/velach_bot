const Event = require('./Event');
const { EVENT_TYPES } = require('./constants');

class UserFailsToExecuteCommand extends Event {
  static create(command, user, chat) {
    return new UserFailsToExecuteCommand(command, user.id, chat.id);
  }

  constructor(command, userId, chatId) {
    super(EVENT_TYPES.USER_FAILS_TO_EXECUTE_COMMAND);
    this.command = command;
    this.userId = userId;
    this.chatId = chatId;
  }
}

module.exports = UserFailsToExecuteCommand;
