const Route = require('../../../infrastructure/Route');
const AnnounceHandler = require('./Handler');
const DataSaverMiddleware = require('../../middlewares/MessageDataSaverMiddleware');
const MessageAgeCheckMiddleware = require('../../middlewares/MessageAgeCheckMiddleware');
const { announce } = require('../../../text/commands');

class AnnounceRoute extends Route {
  static get middlewareClsList() {
    return [
      DataSaverMiddleware,
      MessageAgeCheckMiddleware,
    ];
  }

  static get HandlerCls() {
    return AnnounceHandler;
  }

  isMatching(message) {
    if (!message.text) {
      return false;
    }

    return (message.text === `${announce}@${this.bot.info.username}`)
      || (message.text === `${announce}`);
  }
}

module.exports = AnnounceRoute;
