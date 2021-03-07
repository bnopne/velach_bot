const Middleware = require('../../../../infrastructure/Middleware');
const messages = require('../../../../text/messages');
const settings = require('../../../../settings');

class BotOwnerMiddleware extends Middleware {
  async process(message) {
    const isUserAuthorized = message.chat.isPrivate() && settings.get('auth.ownerUsername') === message.from.username;

    if (!isUserAuthorized) {
      await this.bot.sendMessage(
        message.chat.id,
        messages.auth.restricted(),
      );

      return null;
    }

    return message;
  }
}

module.exports = BotOwnerMiddleware;
