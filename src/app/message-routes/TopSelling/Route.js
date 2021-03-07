const CommandRoute = require('../../common/MessageCommandRoute');
const TopHandler = require('./Handler');
const DataSaverMiddleware = require('../../middlewares/common/messages/DataSaverMiddleware');
const MessageAgeCheckMiddleware = require('../../middlewares/common/messages/AgeCheckMiddleware');
const { topSelling } = require('../../../text/commands');

class CheckBikeRoute extends CommandRoute {
  static get middlewareClsList() {
    return [
      DataSaverMiddleware,
      MessageAgeCheckMiddleware,
    ];
  }

  static get HandlerCls() {
    return TopHandler;
  }

  // eslint-disable-next-line class-methods-use-this
  getCommand() {
    return topSelling;
  }
}

module.exports = CheckBikeRoute;
