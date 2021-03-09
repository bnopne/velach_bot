const CommandRoute = require('../../common/CallbackQueryCommandRoute');
const DataSaverMiddleware = require('../../middlewares/common/callback-queries/DataSaverMiddleware');
const BotOwnerMiddleware = require('../../middlewares/auth/callback-queries/BotOwner');
const BumpOnSaleBikecheckHandler = require('./Handler');
const commands = require('../../../text/callback-query-commands');

class SageOnSaleBikecheckRoute extends CommandRoute {
  static get middlewareClsList() {
    return [
      DataSaverMiddleware,
      BotOwnerMiddleware,
    ];
  }

  static get HandlerCls() {
    return BumpOnSaleBikecheckHandler;
  }

  // eslint-disable-next-line class-methods-use-this
  getCommand() {
    return commands.sageOnSaleBikecheck;
  }
}

module.exports = SageOnSaleBikecheckRoute;
