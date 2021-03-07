const Route = require('../../../infrastructure/Route');
const CallbackQueryDataSaverMiddleware = require('../../middlewares/CallbackQueryDataSaverMiddleware');
const CallbackQueryPrivateChatOnlyMiddleware = require('../../middlewares/CallbackQueryPrivateChatOnlyMiddleware');
const RestoreBikecheckHandler = require('./Handler');
const commands = require('../../../text/callback-query-commands');

class RestoreBikecheckRoute extends Route {
  static get middlewareClsList() {
    return [
      CallbackQueryDataSaverMiddleware,
      CallbackQueryPrivateChatOnlyMiddleware,
    ];
  }

  static get HandlerCls() {
    return RestoreBikecheckHandler;
  }

  isMatching(callbackQuery) { // eslint-disable-line
    if (!callbackQuery.data) {
      return false;
    }

    return callbackQuery.data.command === commands.restoreBikecheck;
  }
}

module.exports = RestoreBikecheckRoute;
