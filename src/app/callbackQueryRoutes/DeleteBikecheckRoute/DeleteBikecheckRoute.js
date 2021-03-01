const Route = require('../../../infrastructure/Route');
const CallbackQueryDataSaverMiddleware = require('../../middlewares/CallbackQueryDataSaverMiddleware');
const DeleteBikecheckHandler = require('./DeleteBikecheckHandler');
const commands = require('../../../text/callbackQueryCommands');

class DeleteBikecheckRoute extends Route {
  static get middlewareClsList() {
    return [
      CallbackQueryDataSaverMiddleware,
    ];
  }

  static get HandlerCls() {
    return DeleteBikecheckHandler;
  }

  isMatching(callbackQuery) { // eslint-disable-line
    if (!callbackQuery.data) {
      return false;
    }

    return callbackQuery.data.command === commands.deleteBikecheck;
  }
}

module.exports = DeleteBikecheckRoute;
