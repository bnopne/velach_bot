const Route = require('../../../infrastructure/Route');
const CallbackQueryDataSaverMiddleware = require('../../middlewares/CallbackQueryDataSaverMiddleware');
const VoteUpHandler = require('./Handler');
const commands = require('../../../text/callback-query-commands');

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

    return callbackQuery.data.command === commands.like;
  }
}

module.exports = LikeRoute;
