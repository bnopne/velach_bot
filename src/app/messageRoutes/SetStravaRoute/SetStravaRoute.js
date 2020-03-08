const Route = require('../../../infrastructure/Route');
const SetStravaHandler = require('./SetStravaHandler');
const DataSaverMiddleware = require('../../middlewares/MessageDataSaverMiddleware');
const MessageAgeCheckMiddleware = require('../../middlewares/MessageAgeCheckMiddleware');
const UserInteractionMiddleware = require('../../middlewares/UserInteractionMiddleware');
const { setstrava } = require('../../../text/commands');

class CheckBikeRoute extends Route {
  static get middlewareClsList() {
    return [
      DataSaverMiddleware,
      MessageAgeCheckMiddleware,
      UserInteractionMiddleware,
    ];
  }

  static get HandlerCls() {
    return SetStravaHandler;
  }

  isMatching(message) {
    if (!message.text) {
      return false;
    }

    return (message.text === `${setstrava}@${this.bot.info.username}`)
      || (message.text === `${setstrava}`);
  }
}

module.exports = CheckBikeRoute;
