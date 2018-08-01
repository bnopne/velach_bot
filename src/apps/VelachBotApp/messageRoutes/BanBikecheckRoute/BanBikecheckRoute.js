const Route = require('../../../../infrastructure/Route');
const DataSaverMiddleware = require('../../../../common/middlewares/MessageDataSaverMiddleware');
const AdminAuthMiddleware = require('../../../../common/middlewares/AdminAuthMiddleware');
const MessageAgeCheckMiddleware = require('../../../../common/middlewares/MessageAgeCheckMiddleware');
const BanHandler = require('./BanBikecheckHandler');


class BanBikecheckRoute extends Route {
  static get middlewareClsList() {
    return [
      DataSaverMiddleware,
      MessageAgeCheckMiddleware,
      AdminAuthMiddleware,
    ];
  }

  static get HandlerCls() {
    return BanHandler;
  }

  isMatching(message) {
    if (!message.text) {
      return false;
    }

    return (message.text === `/ban_bikecheck@${this.bot.info.username}`)
      || (message.text === '/ban_bikecheck');
  }
}


module.exports = BanBikecheckRoute;
