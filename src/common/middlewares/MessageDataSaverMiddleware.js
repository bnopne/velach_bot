const Middleware = require('../../infrastructure/Middleware');
const Chat = require('../../entities/Chat');
const User = require('../../entities/User');
const UserChatMtm = require('../../entities/UserChatMtm');


class MessageDataSaverMiddleware extends Middleware {
  async process(message) { // eslint-disable-line
    const chat = await Chat.createOrUpdate({
      id: message.chat.id,
      type: message.chat.type,
      title: message.chat.title,
    });

    const user = await User.createOrUpdate({
      id: message.from.id,
      isBot: message.from.isBot,
      firstName: message.from.firstName,
      lastName: message.from.lastName,
      username: message.from.username,
    });

    await UserChatMtm.createOrUpdate({
      userId: user.id,
      chatId: chat.id,
    });

    return message;
  }
}


module.exports = MessageDataSaverMiddleware;
