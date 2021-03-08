const CommandRoute = require('../../common/MessageCommandRoute');
const OnSaleHandler = require('./Handler');
const DataSaverMiddleware = require('../../middlewares/common/messages/DataSaverMiddleware');
const MessageAgeCheckMiddleware = require('../../middlewares/common/messages/AgeCheckMiddleware');
const { onSale } = require('../../../text/commands');

class OnSaleRoute extends CommandRoute {
  static get middlewareClsList() {
    return [
      DataSaverMiddleware,
      MessageAgeCheckMiddleware,
    ];
  }

  static get HandlerCls() {
    return OnSaleHandler;
  }

  // eslint-disable-next-line class-methods-use-this
  getCommand() {
    return onSale;
  }
}

module.exports = OnSaleRoute;
