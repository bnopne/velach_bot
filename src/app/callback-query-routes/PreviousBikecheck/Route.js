const CommandRoute = require('../../common/CallbackQueryCommandRoute');
const DataSaverMiddleware = require('../../middlewares/common/callback-queries/DataSaverMiddleware');
const PreviousBikecheckHandler = require('./Handler');
const commands = require('../../../text/callback-query-commands');

class PreviousBikecheckRoute extends CommandRoute {
  static get middlewareClsList() {
    return [
      DataSaverMiddleware,
    ];
  }

  static get HandlerCls() {
    return PreviousBikecheckHandler;
  }

  // eslint-disable-next-line class-methods-use-this
  getCommand() {
    return commands.showPreviousBikecheck;
  }
}

module.exports = PreviousBikecheckRoute;
