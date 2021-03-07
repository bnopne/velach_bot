const CommandRoute = require('../../common/CallbackQueryCommandRoute');
const DataSaverMiddleware = require('../../middlewares/common/callback-queries/DataSaverMiddleware');
const VoteDownHandler = require('./Handler');
const commands = require('../../../text/callback-query-commands');

class VoteDownRoute extends CommandRoute {
  static get middlewareClsList() {
    return [
      DataSaverMiddleware,
    ];
  }

  static get HandlerCls() {
    return VoteDownHandler;
  }

  // eslint-disable-next-line class-methods-use-this
  getCommand() {
    return commands.dislike;
  }
}

module.exports = VoteDownRoute;
