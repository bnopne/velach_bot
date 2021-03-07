const CommandRoute = require('../../common/CallbackQueryCommandRoute');
const DataSaverMiddleware = require('../../middlewares/common/callback-queries/DataSaverMiddleware');
const PrivateChatOnlyMiddleware = require('../../middlewares/auth/callback-queries/PrivateChatOnlyMiddleware');
const PreviousBikecheckHandler = require('./Handler');
const commands = require('../../../text/callback-query-commands');

class PreviousDeletedBikecheckRoute extends CommandRoute {
  static get middlewareClsList() {
    return [
      DataSaverMiddleware,
      PrivateChatOnlyMiddleware,
    ];
  }

  static get HandlerCls() {
    return PreviousBikecheckHandler;
  }

  // eslint-disable-next-line class-methods-use-this
  getCommand() {
    return commands.showPreviousDeletedBikecheck;
  }
}

module.exports = PreviousDeletedBikecheckRoute;
