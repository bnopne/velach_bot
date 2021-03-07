const CommandRoute = require('../../common/CallbackQueryCommandRoute');
const DataSaverMiddleware = require('../../middlewares/common/callback-queries/DataSaverMiddleware');
const VoteUpHandler = require('./Handler');
const commands = require('../../../text/callback-query-commands');

class LikeRoute extends CommandRoute {
  static get middlewareClsList() {
    return [
      DataSaverMiddleware,
    ];
  }

  static get HandlerCls() {
    return VoteUpHandler;
  }

  // eslint-disable-next-line class-methods-use-this
  getCommand() {
    return commands.like;
  }
}

module.exports = LikeRoute;
