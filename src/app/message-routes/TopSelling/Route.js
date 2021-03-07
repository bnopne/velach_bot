const Route = require('../../../infrastructure/Route');
const TopHandler = require('./Handler');
const DataSaverMiddleware = require('../../middlewares/MessageDataSaverMiddleware');
const MessageAgeCheckMiddleware = require('../../middlewares/MessageAgeCheckMiddleware');
const { topSelling } = require('../../../text/commands');

class CheckBikeRoute extends Route {
  static get middlewareClsList() {
    return [
      DataSaverMiddleware,
      MessageAgeCheckMiddleware,
    ];
  }

  static get HandlerCls() {
    return TopHandler;
  }

  isMatching(message) {
    if (!message.text) {
      return false;
    }

    return (message.text === `${topSelling}@${this.bot.info.username}`)
      || (message.text === `${topSelling}`);
  }
}

module.exports = CheckBikeRoute;
