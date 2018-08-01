const Route = require('../../../../infrastructure/Route');
const DataSaverMiddleware = require('../../../../common/middlewares/MessageDataSaverMiddleware');
const AdminAuthMiddleware = require('../../../../common/middlewares/AdminAuthMiddleware');
const MessageAgeCheckMiddleware = require('../../../../common/middlewares/MessageAgeCheckMiddleware');
const UnbanHandler = require('./UnbanBikecheckHandler');


class BanBikecheckRoute extends Route {
  static get middlewareClsList() {
    return [
      DataSaverMiddleware,
      MessageAgeCheckMiddleware,
      AdminAuthMiddleware,
    ];
  }

  static get HandlerCls() {
    return UnbanHandler;
  }

  isMatching(message) {
    if (!message.text) {
      return false;
    }

    return (message.text === `/unban_bikecheck@${this.bot.info.username}`)
      || (message.text === '/unban_bikecheck');
  }
}


module.exports = BanBikecheckRoute;
