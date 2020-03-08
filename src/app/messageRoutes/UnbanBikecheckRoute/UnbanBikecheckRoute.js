const Route = require('../../../infrastructure/Route');
const DataSaverMiddleware = require('../../middlewares/MessageDataSaverMiddleware');
const AdminAuthMiddleware = require('../../middlewares/AdminAuthMiddleware');
const MessageAgeCheckMiddleware = require('../../middlewares/MessageAgeCheckMiddleware');
const UnbanHandler = require('./UnbanBikecheckHandler');
const { unbanBikecheck } = require('../../../text/commands');

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

    return (message.text === `${unbanBikecheck}@${this.bot.info.username}`)
      || (message.text === `${unbanBikecheck}`);
  }
}

module.exports = BanBikecheckRoute;
