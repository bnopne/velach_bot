const Route = require('../../../infrastructure/Route');
const CallbackQueryDataSaverMiddleware = require('../../middlewares/CallbackQueryDataSaverMiddleware');
const CallbackQueryPrivateChatOnlyMiddleware = require('../../middlewares/CallbackQueryPrivateChatOnlyMiddleware');
const PreviousBikecheckHandler = require('./PreviousDeletedBikecheckHandler');
const commands = require('../../../text/callbackQueryCommands');

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
