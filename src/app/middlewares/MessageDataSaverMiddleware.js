const Middleware = require('../../infrastructure/Middleware');
const Chat = require('../../entities/Chat');
const User = require('../../entities/User');
const UserChatMtm = require('../../entities/UserChatMtm');

class MessageDataSaverMiddleware extends Middleware {
  async process(message) { // eslint-disable-line
    await Chat.createOrUpdate({
      id: message.chat.id,
      type: message.chat.type,
      title: message.chat.title,
    });

    await User.createOrUpdate({
      id: message.from.id,
      isBot: message.from.isBot,
      firstName: message.from.firstName,
      lastName: message.from.lastName,
      username: message.from.username,
    });

    await UserChatMtm.createOrUpdate({
      userId: message.from.id,
      chatId: message.chat.id,
    });

    if (message.replyToMessage) {
      await Chat.createOrUpdate({
        id: message.replyToMessage.chat.id,
        type: message.replyToMessage.chat.type,
        title: message.replyToMessage.chat.title,
      });

      await User.createOrUpdate({
        id: message.replyToMessage.from.id,
        isBot: message.replyToMessage.from.isBot,
        firstName: message.replyToMessage.from.firstName,
        lastName: message.replyToMessage.from.lastName,
        username: message.replyToMessage.from.username,
      });
    }

    return message;
  }
}

module.exports = MessageDataSaverMiddleware;
