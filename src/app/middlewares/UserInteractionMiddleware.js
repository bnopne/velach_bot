const Middleware = require('../../infrastructure/Middleware');
const UserInteracts = require('../../infrastructure/events/UserInteracts');

class UserInteractionTrackingMiddleware extends Middleware {
  async process(message) {
    if (message.from) {
      this.eventBus.emitUserInteracts(new UserInteracts(message.from.id, message.chat.id));
    }

    return message;
  }
}

module.exports = UserInteractionTrackingMiddleware;
