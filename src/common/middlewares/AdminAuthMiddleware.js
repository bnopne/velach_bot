const Middleware = require('../../infrastructure/Middleware');
const TelegramChatMember = require('../../infrastructure/dto/TelegramChatMember');


class AdminAuthMiddleware extends Middleware {
  async process(message) {
    if (message.chat.isPrivate() || message.chat.isChannel()) {
      return null;
    }

    const chatAdmins = (await this.bot.getChatAdministrators(message.chat.id))
      .map(rawChatMember => new TelegramChatMember(rawChatMember))
      .map(chatMember => chatMember.user);

    const isUserAuthorized = Boolean(chatAdmins.find(u => u.id === message.from.id));

    if (!isUserAuthorized) {
      await this.bot.sendMessage(
        message.chat.id,
        '1) Во первых иди нахуй что ты мне сделаешь\n2) Вовторых эту команду могут только админы выполнять\n3) В третих я в другом городе что ты мне сделаешь за мат извени',
      );

      return null;
    }

    return message;
  }
}


module.exports = AdminAuthMiddleware;
