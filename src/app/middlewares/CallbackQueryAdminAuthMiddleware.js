const Middleware = require('../../infrastructure/Middleware');
const TelegramChatMember = require('../../infrastructure/dto/TelegramChatMember');
const messages = require('../../text/messages');

class CallbackQueryAdminAuthMiddleware extends Middleware {
  async process(callbackQuery) {
    if (callbackQuery.message.chat.isPrivate() || callbackQuery.message.chat.isChannel()) {
      await this.bot.answerCallbackQuery(
        callbackQuery.id,
        { text: messages.common.cantDoInPrivateChatsAndChannels() },
      );
      return null;
    }

    const chatAdmins = (await this.bot.getChatAdministrators(callbackQuery.message.chat.id))
      .map((rawChatMember) => new TelegramChatMember(rawChatMember))
      .map((chatMember) => chatMember.user);

    const isUserAuthorized = Boolean(chatAdmins.find((u) => u.id === callbackQuery.from.id));

    if (!isUserAuthorized) {
      await this.bot.answerCallbackQuery(
        callbackQuery.id,
        { text: messages.auth.onlyAdminsCanDoThat() },
      );

      return null;
    }

    return callbackQuery;
  }
}

module.exports = CallbackQueryAdminAuthMiddleware;
