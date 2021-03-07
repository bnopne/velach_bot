const Route = require('../../../infrastructure/Route');
const CallbackQueryDataSaverMiddleware = require('../../middlewares/CallbackQueryDataSaverMiddleware');
const ToggleOnSaleHandler = require('./Handler');
const commands = require('../../../text/callback-query-commands');

class ToggleOnSaleRoute extends Route {
  static get middlewareClsList() {
    return [
      CallbackQueryDataSaverMiddleware,
    ];
  }

  static get HandlerCls() {
    return ToggleOnSaleHandler;
  }

  isMatching(callbackQuery) { // eslint-disable-line
    if (!callbackQuery.data) {
      return false;
    }

    return callbackQuery.data.command === commands.toggleOnSale;
  }
}

module.exports = ToggleOnSaleRoute;
