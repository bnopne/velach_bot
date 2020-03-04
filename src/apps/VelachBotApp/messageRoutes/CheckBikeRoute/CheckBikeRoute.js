const Route = require('../../../../infrastructure/Route');
const CheckBikeHandler = require('./CheckBikeHandler');
const DataSaverMiddleware = require('../../../../common/middlewares/MessageDataSaverMiddleware');
const MessageAgeCheckMiddleware = require('../../../../common/middlewares/MessageAgeCheckMiddleware');
const { checkbike } = require('../../../../text/commands');

class CheckBikeRoute extends Route {
  static get middlewareClsList() {
    return [
      DataSaverMiddleware,
      MessageAgeCheckMiddleware,
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
