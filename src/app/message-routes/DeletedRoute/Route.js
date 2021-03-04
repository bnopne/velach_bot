const Route = require('../../../infrastructure/Route');
const DeletedHandler = require('./Handler');
const DataSaverMiddleware = require('../../middlewares/MessageDataSaverMiddleware');
const MessageAgeCheckMiddleware = require('../../middlewares/MessageAgeCheckMiddleware');
const PrivateChatOnlyMiddleware = require('../../middlewares/PrivateChatOnlyMiddleware');
const { deleted } = require('../../../text/commands');

class DeletedRoute extends Route {
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

  isMatching(message) {
    if (!message.text) {
      return false;
    }

    return (message.text === `${deleted}@${this.bot.info.username}`)
      || (message.text === `${deleted}`);
  }
}

module.exports = DeletedRoute;
