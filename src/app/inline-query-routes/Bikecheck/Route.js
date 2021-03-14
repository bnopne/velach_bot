const Route = require('../../../infrastructure/Route');
const BikecheckHandler = require('./Handler');
const DataSaverMiddleware = require('../../middlewares/common/inline-queries/DataSaverMiddleware');

class BikecheckRoute extends Route {
  static get middlewareClsList() {
    return [DataSaverMiddleware];
  }

  static get HandlerCls() {
    return BikecheckHandler;
  }

  // eslint-disable-next-line class-methods-use-this
  isMatching(inlineQuery) {
    return true;
    // return inlineQuery.query === 'bikecheck';
  }
}

module.exports = BikecheckRoute;
