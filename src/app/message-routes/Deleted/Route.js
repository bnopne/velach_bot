const CommandRoute = require('../../common/MessageCommandRoute');
const DeletedHandler = require('./Handler');
const DataSaverMiddleware = require('../../middlewares/common/messages/DataSaverMiddleware');
const MessageAgeCheckMiddleware = require('../../middlewares/common/messages/AgeCheckMiddleware');
const PrivateChatOnlyMiddleware = require('../../middlewares/auth/messages/PrivateChatOnlyMiddleware');
const { deleted } = require('../../../text/commands');

class DeletedRoute extends CommandRoute {
  static get middlewareClsList() {
    return [
      DataSaverMiddleware,
      MessageAgeCheckMiddleware,
      PrivateChatOnlyMiddleware,
    ];
  }

  static get HandlerCls() {
    return DeletedHandler;
  }

  // eslint-disable-next-line class-methods-use-this
  getCommand() {
    return deleted;
  }
}

module.exports = DeletedRoute;
