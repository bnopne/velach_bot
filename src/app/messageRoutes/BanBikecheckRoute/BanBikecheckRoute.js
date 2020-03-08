const Route = require('../../../infrastructure/Route');
const DataSaverMiddleware = require('../../middlewares/MessageDataSaverMiddleware');
const AdminAuthMiddleware = require('../../middlewares/AdminAuthMiddleware');
const MessageAgeCheckMiddleware = require('../../middlewares/MessageAgeCheckMiddleware');
const BanHandler = require('./BanBikecheckHandler');
const { banBikecheck } = require('../../../text/commands');

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

    return (message.text === `${banBikecheck}@${this.bot.info.username}`)
      || (message.text === `${banBikecheck}`);
  }
}

module.exports = BanBikecheckRoute;
