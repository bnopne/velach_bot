const CommandRoute = require('../../common/MessageCommandRoute');
const HelpHandler = require('./Handler');
const DataSaverMiddleware = require('../../middlewares/common/messages/DataSaverMiddleware');
const MessageAgeCheckMiddleware = require('../../middlewares/common/messages/AgeCheckMiddleware');
const { help } = require('../../../text/commands');

class CheckBikeRoute extends CommandRoute {
  static get middlewareClsList() {
    return [
      DataSaverMiddleware,
      MessageAgeCheckMiddleware,
    ];
  }

  static get HandlerCls() {
    return HelpHandler;
  }

  // eslint-disable-next-line class-methods-use-this
  getCommand() {
    return help;
  }
}

module.exports = CheckBikeRoute;
