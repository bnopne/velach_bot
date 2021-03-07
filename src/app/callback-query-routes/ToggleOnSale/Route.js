const CommandRoute = require('../../common/CallbackQueryCommandRoute');
const DataSaverMiddleware = require('../../middlewares/common/callback-queries/DataSaverMiddleware');
const PrivateChatOnlyMiddleware = require('../../middlewares/auth/callback-queries/PrivateChatOnlyMiddleware');
const ToggleOnSaleHandler = require('./Handler');
const commands = require('../../../text/callback-query-commands');

class ToggleOnSaleRoute extends CommandRoute {
  static get middlewareClsList() {
    return [
      DataSaverMiddleware,
      PrivateChatOnlyMiddleware,
    ];
  }

  static get HandlerCls() {
    return ToggleOnSaleHandler;
  }

  // eslint-disable-next-line class-methods-use-this
  getCommand() {
    return commands.toggleOnSale;
  }
}

module.exports = ToggleOnSaleRoute;
