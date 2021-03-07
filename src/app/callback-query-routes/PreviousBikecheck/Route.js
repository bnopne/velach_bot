const Route = require('../../../infrastructure/Route');
const CallbackQueryDataSaverMiddleware = require('../../middlewares/CallbackQueryDataSaverMiddleware');
const PreviousBikecheckHandler = require('./Handler');
const commands = require('../../../text/callback-query-commands');

class PreviousBikecheckRoute extends Route {
  static get middlewareClsList() {
    return [
      CallbackQueryDataSaverMiddleware,
    ];
  }

  static get HandlerCls() {
    return PreviousBikecheckHandler;
  }

  isMatching(callbackQuery) { // eslint-disable-line
    if (!callbackQuery.data) {
      return false;
    }

    return callbackQuery.data.command === commands.showPreviousBikecheck;
  }
}

module.exports = PreviousBikecheckRoute;
