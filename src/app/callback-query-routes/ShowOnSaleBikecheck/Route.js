const CommandRoute = require('../../common/CallbackQueryCommandRoute');
const DataSaverMiddleware = require('../../middlewares/common/callback-queries/DataSaverMiddleware');
const NextOnSaleBikecheckHandler = require('./Handler');
const commands = require('../../../text/callback-query-commands');

class ShowOnSaleBikecheckRoute extends CommandRoute {
  static get middlewareClsList() {
    return [
      DataSaverMiddleware,
    ];
  }

  static get HandlerCls() {
    return NextOnSaleBikecheckHandler;
  }

  // eslint-disable-next-line class-methods-use-this
  getCommand() {
    return commands.showOnSaleBikecheck;
  }
}

module.exports = ShowOnSaleBikecheckRoute;
