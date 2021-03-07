const Middleware = require('../../../../infrastructure/Middleware');
const TelegramChatMember = require('../../../../infrastructure/dto/TelegramChatMember');
const messages = require('../../../../text/messages');

class AdminAuthMiddleware extends Middleware {
  async process(message) {
    if (message.chat.isPrivate() || message.chat.isChannel()) {
      return null;
    }

    const admins = (await this.bot.getChatAdministrators(message.chat.id))
      .map((rawChatMember) => new TelegramChatMember(rawChatMember))
      .map((chatMember) => chatMember.user);

    const isUserAuthorized = Boolean(admins.find((user) => user.id === message.from.id));

    if (!isUserAuthorized) {
      await this.bot.sendMessage(message.chat.id, messages.auth.onlyAdminsCanDoThat());
      return null;
    }

    return message;
  }
}

module.exports = AdminAuthMiddleware;
