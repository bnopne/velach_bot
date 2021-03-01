const Route = require('../../../infrastructure/Route');
const CallbackQueryDataSaverMiddleware = require('../../middlewares/CallbackQueryDataSaverMiddleware');
const CallbackQueryPrivateChatOnlyMiddleware = require('../../middlewares/CallbackQueryPrivateChatOnlyMiddleware');
const RestoreBikecheckHandler = require('./RestoreBikecheckHandler');

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

    return callbackQuery.data.command === 'restore-bikecheck';
  }
}

module.exports = RestoreBikecheckRoute;
