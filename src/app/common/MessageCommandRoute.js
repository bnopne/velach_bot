const Route = require('../../infrastructure/Route');
const { NotImplementedError } = require('../../infrastructure/errors');
const { EVENT_TYPES } = require('../../infrastructure/events/constants');
const UserExecutesCommand = require('../../infrastructure/events/UserExecutesCommand');

class CommandRoute extends Route {
  // eslint-disable-next-line class-methods-use-this
  getCommand() {
    throw new NotImplementedError();
  }

  isMatching(message) {
    if (!message.text) {
      return false;
    }

    const command = this.getCommand();

    return (message.text === `${command}@${this.bot.info.username}`)
      || (message.text === `${command}`);
  }

  process(message) { // eslint-disable-line
    this.eventBus.emit(
      EVENT_TYPES.USER_EXECUTES_COMMAND,
      new UserExecutesCommand(this.getCommand(), message.from.id, message.chat.id),
    );

    return super.process(message);
  }
}

module.exports = CommandRoute;
