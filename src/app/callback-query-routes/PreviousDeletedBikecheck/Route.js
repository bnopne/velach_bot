const Route = require('../../../infrastructure/Route');
const CallbackQueryDataSaverMiddleware = require('../../middlewares/CallbackQueryDataSaverMiddleware');
const CallbackQueryPrivateChatOnlyMiddleware = require('../../middlewares/CallbackQueryPrivateChatOnlyMiddleware');
const PreviousBikecheckHandler = require('./Handler');
const commands = require('../../../text/callback-query-commands');

class PreviousDeletedBikecheckRoute extends Route {
  static get middlewareClsList() {
    return [
      CallbackQueryDataSaverMiddleware,
      CallbackQueryPrivateChatOnlyMiddleware,
    ];
  }

  static get HandlerCls() {
    return PreviousBikecheckHandler;
  }

  isMatching(callbackQuery) { // eslint-disable-line
    if (!callbackQuery.data) {
      return false;
    }

    return callbackQuery.data.command === commands.showPreviousDeletedBikecheck;
  }
}

module.exports = PreviousDeletedBikecheckRoute;
