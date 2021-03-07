const CommandRoute = require('../../common/MessageCommandRoute');
const AnnounceHandler = require('./Handler');
const DataSaverMiddleware = require('../../middlewares/common/messages/DataSaverMiddleware');
const MessageAgeCheckMiddleware = require('../../middlewares/common/messages/AgeCheckMiddleware');
const BotOwnerMiddleware = require('../../middlewares/auth/messages/BotOwner');
const { announce } = require('../../../text/commands');

class AnnounceRoute extends CommandRoute {
  static get middlewareClsList() {
    return [
      DataSaverMiddleware,
      MessageAgeCheckMiddleware,
      BotOwnerMiddleware,
    ];
  }

  static get HandlerCls() {
    return AnnounceHandler;
  }

  // eslint-disable-next-line class-methods-use-this
  getCommand() {
    return announce;
  }
}

module.exports = AnnounceRoute;
