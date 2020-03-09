const Middleware = require('../../infrastructure/Middleware');
const { EVENT_TYPES } = require('../../infrastructure/events/constants');
const UserExecutesCommand = require('../../infrastructure/events/UserExecutesCommand');

class CommandMetricsMiddleware extends Middleware {
  async process(message) { // eslint-disable-line
    this.emit(
      EVENT_TYPES.USER_EXECUTES_COMMAND,
      new UserExecutesCommand()
    );

    return message;
  }
}

module.exports = CommandMetricsMiddleware;
