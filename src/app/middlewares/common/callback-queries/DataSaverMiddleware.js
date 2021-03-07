const Middleware = require('../../../../infrastructure/Middleware');
const User = require('../../../../entities/User');

class DataSaverMiddleware extends Middleware {
  async process(callbackQuery) { // eslint-disable-line
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
