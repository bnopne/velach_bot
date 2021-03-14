const Middleware = require('../../../../infrastructure/Middleware');
const TelegramChatMember = require('../../../../infrastructure/dto/TelegramChatMember');
const messages = require('../../../../text/messages');

class AdminAuthMiddleware extends Middleware {
  async process(callbackQuery) {
    if (callbackQuery.message.chat.isPrivate() || callbackQuery.message.chat.isChannel()) {
      await this.bot.answerCallbackQuery(callbackQuery.id, {});
      return null;
    }

    const admins = (await this.bot.getChatAdministrators(callbackQuery.chatInstance))
      .map((rawChatMember) => new TelegramChatMember(rawChatMember))
      .map((chatMember) => chatMember.user);

    const isUserAuthorized = Boolean(admins.find((user) => user.id === callbackQuery.from.id));

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

module.exports = AdminAuthMiddleware;
