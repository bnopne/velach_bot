const Route = require('../../../infrastructure/Route');
const HelpHandler = require('./HelpHandler');
const DataSaverMiddleware = require('../../middlewares/MessageDataSaverMiddleware');
const MessageAgeCheckMiddleware = require('../../middlewares/MessageAgeCheckMiddleware');
const { help } = require('../../../text/commands');

class CheckBikeRoute extends Route {
  static get middlewareClsList() {
    return [
      DataSaverMiddleware,
      MessageAgeCheckMiddleware,
    ];
  }

  static get HandlerCls() {
    return HelpHandler;
  }

  isMatching(message) {
    if (!message.text) {
      return false;
    }

    return (message.text === `${help}@${this.bot.info.username}`)
      || (message.text === `${help}`);
  }
}

module.exports = CheckBikeRoute;
