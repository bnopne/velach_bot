const CommandRoute = require('../../common/MessageCommandRoute');
const StartHandler = require('./Handler');
const DataSaverMiddleware = require('../../middlewares/common/messages/DataSaverMiddleware');
const MessageAgeCheckMiddleware = require('../../middlewares/common/messages/AgeCheckMiddleware');
const { start } = require('../../../text/commands');

class StartRoute extends CommandRoute {
  static get middlewareClsList() {
    return [
      DataSaverMiddleware,
      MessageAgeCheckMiddleware,
    ];
  }

  static get HandlerCls() {
    return StartHandler;
  }

  // eslint-disable-next-line class-methods-use-this
  getCommand() {
    return start;
  }
}

module.exports = StartRoute;
