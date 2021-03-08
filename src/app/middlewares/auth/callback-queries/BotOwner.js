const Middleware = require('../../../../infrastructure/Middleware');
const messages = require('../../../../text/messages');
const settings = require('../../../../settings');

class BotOwnerMiddleware extends Middleware {
  async process(callbackQuery) {
    const isUserAuthorized = callbackQuery.message.chat.isPrivate() && settings.get('auth.ownerUsername') === callbackQuery.from.username;

    if (!isUserAuthorized) {
      await this.bot.answerCallbackQuery(
        callbackQuery.id,
        { text: messages.auth.restricted() },
      );

      return null;
    }

    return callbackQuery;
  }
}

module.exports = BotOwnerMiddleware;
