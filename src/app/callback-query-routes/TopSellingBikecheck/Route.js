const Route = require('../../../infrastructure/Route');
const CallbackQueryDataSaverMiddleware = require('../../middlewares/CallbackQueryDataSaverMiddleware');
const NextTopBikecheckHandler = require('./Handler');
const commands = require('../../../text/callback-query-commands');

class TopSellingBikecheckRoute extends Route {
  static get middlewareClsList() {
    return [
      CallbackQueryDataSaverMiddleware,
    ];
  }

  static get HandlerCls() {
    return NextTopBikecheckHandler;
  }

  isMatching(callbackQuery) { // eslint-disable-line
    if (!callbackQuery.data) {
      return false;
    }

    return callbackQuery.data.command === commands.showTopSellingBikecheck;
  }
}

module.exports = TopSellingBikecheckRoute;
