const Route = require('../../../infrastructure/Route');
const CallbackQueryDataSaverMiddleware = require('../../middlewares/CallbackQueryDataSaverMiddleware');
const NextTopBikecheckHandler = require('./TopBikecheckHandler');
const commands = require('../../../text/callbackQueryCommands');

class TopBikecheckRoute extends Route {
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

    return callbackQuery.data.command === commands.showTopBikecheck;
  }
}

module.exports = TopBikecheckRoute;
