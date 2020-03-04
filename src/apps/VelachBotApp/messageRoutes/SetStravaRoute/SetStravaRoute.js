const Route = require('../../../../infrastructure/Route');
const SetStravaHandler = require('./SetStravaHandler');
const DataSaverMiddleware = require('../../../../common/middlewares/MessageDataSaverMiddleware');
const MessageAgeCheckMiddleware = require('../../../../common/middlewares/MessageAgeCheckMiddleware');
const { setstrava } = require('../../../../text/commands');

class CheckBikeRoute extends Route {
  static get middlewareClsList() {
    return [
      DataSaverMiddleware,
      MessageAgeCheckMiddleware,
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
