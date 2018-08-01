const Route = require('../../../../infrastructure/Route');
const CallbackQueryDataSaverMiddleware = require('../../../../common/middlewares/CallbackQueryDataSaverMiddleware');
const ReportHandler = require('./ReportHandler');


class ReportRoute extends Route {
  static get middlewareClsList() {
    return [
      CallbackQueryDataSaverMiddleware,
    ];
  }

  static get HandlerCls() {
    return ReportHandler;
  }

  isMatching(callbackQuery) { // eslint-disable-line
    if (!callbackQuery.data) {
      return false;
    }

    return callbackQuery.data.command === 'report';
  }
}


module.exports = ReportRoute;
