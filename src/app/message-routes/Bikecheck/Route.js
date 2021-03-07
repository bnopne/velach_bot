const CommandRoute = require('../../common/MessageCommandRoute');
const BikecheckHandler = require('./Handler');
const DataSaverMiddleware = require('../../middlewares/common/messages/DataSaverMiddleware');
const MessageAgeCheckMiddleware = require('../../middlewares/common/messages/AgeCheckMiddleware');
const { bikecheck } = require('../../../text/commands');

class BikecheckRoute extends CommandRoute {
  static get middlewareClsList() {
    return [
      DataSaverMiddleware,
      MessageAgeCheckMiddleware,
    ];
  }

  static get HandlerCls() {
    return BikecheckHandler;
  }

  // eslint-disable-next-line class-methods-use-this
  getCommand() {
    return bikecheck;
  }
}

module.exports = BikecheckRoute;
