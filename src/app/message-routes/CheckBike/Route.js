const CommandRoute = require('../../common/MessageCommandRoute');
const CheckBikeHandler = require('./Handler');
const DataSaverMiddleware = require('../../middlewares/common/messages/DataSaverMiddleware');
const MessageAgeCheckMiddleware = require('../../middlewares/common/messages/AgeCheckMiddleware');
const { checkbike } = require('../../../text/commands');

class CheckBikeRoute extends CommandRoute {
  static get middlewareClsList() {
    return [
      DataSaverMiddleware,
      MessageAgeCheckMiddleware,
    ];
  }

  static get HandlerCls() {
    return CheckBikeHandler;
  }

  // eslint-disable-next-line class-methods-use-this
  getCommand() {
    return checkbike;
  }
}

module.exports = CheckBikeRoute;
