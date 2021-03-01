const Middleware = require('../../infrastructure/Middleware');
const messages = require('../../text/messages');

class PrivateChatOnlyMiddleware extends Middleware {
  async process(callbackQuery) {
    if (!callbackQuery.message.chat.isPrivate()) {
      await this.bot.answerCallbackQuery(
        callbackQuery.id,
        { text: messages.bikecheck.onlyPrivateChats() },
      );
      return null;
    }

    return callbackQuery;
  }
}

module.exports = PrivateChatOnlyMiddleware;
