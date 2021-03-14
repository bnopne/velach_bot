const Middleware = require('../../../../infrastructure/Middleware');
const User = require('../../../../entities/User');
const Chat = require('../../../../entities/Chat');

class DataSaverMiddleware extends Middleware {
  async process(callbackQuery) { // eslint-disable-line
    let chat = await Chat.findById(callbackQuery.chatInstance);

    if (!chat) {
      chat = await Chat.createOrUpdate({ id: callbackQuery.chatInstance });
    }

    await User.createOrUpdate({
      id: callbackQuery.from.id,
      isBot: callbackQuery.from.isBot,
      firstName: callbackQuery.from.firstName,
      lastName: callbackQuery.from.lastName,
      username: callbackQuery.from.username,
    });

    return callbackQuery;
  }
}

module.exports = DataSaverMiddleware;
