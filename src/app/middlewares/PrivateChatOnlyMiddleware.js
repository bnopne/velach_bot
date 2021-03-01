const Middleware = require('../../infrastructure/Middleware');
const messages = require('../../text/messages');

class PrivateChatOnlyMiddleware extends Middleware {
  async process(message) {
    if (!message.chat.isPrivate()) {
      await this.bot.sendMessage(
        message.chat.id,
        messages.auth.privateChatsOnly(),
      );
      return null;
    }

    return message;
  }
}

module.exports = PrivateChatOnlyMiddleware;
