const Route = require('../../../../infrastructure/Route');
const CallbackQueryDataSaverMiddleware = require('../../../../common/middlewares/CallbackQueryDataSaverMiddleware');
const VoteUpHandler = require('./LikeHandler');

class LikeRoute extends Route {
  static get middlewareClsList() {
    return [
      CallbackQueryDataSaverMiddleware,
    ];
  }

  static get HandlerCls() {
    return VoteUpHandler;
  }

  isMatching(callbackQuery) { // eslint-disable-line
    if (!callbackQuery.data) {
      return false;
    }

    return callbackQuery.data.command === 'like';
  }
}

module.exports = LikeRoute;
