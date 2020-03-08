const Route = require('../../../infrastructure/Route');
const CheckBikeHandler = require('./CheckBikeHandler');
const DataSaverMiddleware = require('../../middlewares/MessageDataSaverMiddleware');
const MessageAgeCheckMiddleware = require('../../middlewares/MessageAgeCheckMiddleware');
const UserInteractionMiddleware = require('../../middlewares/UserInteractionMiddleware');
const { checkbike } = require('../../../text/commands');

class CheckBikeRoute extends Route {
  static get middlewareClsList() {
    return [
      DataSaverMiddleware,
      MessageAgeCheckMiddleware,
      UserInteractionMiddleware,
    ];
  }

  static get HandlerCls() {
    return CheckBikeHandler;
  }

  isMatching(message) {
    if (!message.text) {
      return false;
    }

    return (message.text === `${checkbike}@${this.bot.info.username}`)
      || (message.text === `${checkbike}`);
  }
}

module.exports = CheckBikeRoute;
