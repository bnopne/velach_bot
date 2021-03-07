const CommandRoute = require('../../common/CallbackQueryCommandRoute');
const DataSaverMiddleware = require('../../middlewares/common/callback-queries/DataSaverMiddleware');
const PrivateChatOnlyMiddleware = require('../../middlewares/auth/callback-queries/PrivateChatOnlyMiddleware');
const RestoreBikecheckHandler = require('./Handler');
const commands = require('../../../text/callback-query-commands');

class RestoreBikecheckRoute extends CommandRoute {
  static get middlewareClsList() {
    return [
      DataSaverMiddleware,
      PrivateChatOnlyMiddleware,
    ];
  }

  static get HandlerCls() {
    return RestoreBikecheckHandler;
  }

  // eslint-disable-next-line class-methods-use-this
  getCommand() {
    return commands.restoreBikecheck;
  }
}

module.exports = RestoreBikecheckRoute;
