const Route = require('../../../../infrastructure/Route');
const CallbackQueryDataSaverMiddleware = require('../../../../common/middlewares/CallbackQueryDataSaverMiddleware');
const VoteDownHandler = require('./DislikeHandler');


class VoteDownRoute extends Route {
  static get middlewareClsList() {
    return [
      CallbackQueryDataSaverMiddleware,
    ];
  }

  static get HandlerCls() {
    return VoteDownHandler;
  }

  isMatching(callbackQuery) { // eslint-disable-line
    if (!callbackQuery.data) {
      return false;
    }

    return callbackQuery.data.command === 'dislike';
  }
}


module.exports = VoteDownRoute;
