const CommandRoute = require('../../common/CallbackQueryCommandRoute');
const DataSaverMiddleware = require('../../middlewares/common/callback-queries/DataSaverMiddleware');
const NextBikecheckHandler = require('./Handler');
const commands = require('../../../text/callback-query-commands');

class NextBikecheckRoute extends CommandRoute {
  static get middlewareClsList() {
    return [
      DataSaverMiddleware,
    ];
  }

  static get HandlerCls() {
    return NextBikecheckHandler;
  }

  // eslint-disable-next-line class-methods-use-this
  getCommand() {
    return commands.showNextBikecheck;
  }
}

module.exports = NextBikecheckRoute;
