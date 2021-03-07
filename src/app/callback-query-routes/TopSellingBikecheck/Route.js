const CommandRoute = require('../../common/CallbackQueryCommandRoute');
const DataSaverMiddleware = require('../../middlewares/common/callback-queries/DataSaverMiddleware');
const NextTopBikecheckHandler = require('./Handler');
const commands = require('../../../text/callback-query-commands');

class TopSellingBikecheckRoute extends CommandRoute {
  static get middlewareClsList() {
    return [
      DataSaverMiddleware,
    ];
  }

  static get HandlerCls() {
    return NextTopBikecheckHandler;
  }

  // eslint-disable-next-line class-methods-use-this
  getCommand() {
    return commands.showTopSellingBikecheck;
  }
}

module.exports = TopSellingBikecheckRoute;
