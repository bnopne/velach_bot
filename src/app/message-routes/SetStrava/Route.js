const CommandRoute = require('../../common/MessageCommandRoute');
const SetStravaHandler = require('./Handler');
const DataSaverMiddleware = require('../../middlewares/common/messages/DataSaverMiddleware');
const MessageAgeCheckMiddleware = require('../../middlewares/common/messages/AgeCheckMiddleware');
const { setstrava } = require('../../../text/commands');

class CheckBikeRoute extends CommandRoute {
  static get middlewareClsList() {
    return [
      DataSaverMiddleware,
      MessageAgeCheckMiddleware,
    ];
  }

  static get HandlerCls() {
    return SetStravaHandler;
  }

  // eslint-disable-next-line class-methods-use-this
  getCommand() {
    return setstrava;
  }
}

module.exports = CheckBikeRoute;
