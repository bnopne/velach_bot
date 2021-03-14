const Middleware = require('../../../../infrastructure/Middleware');
const User = require('../../../../entities/User');

class DataSaverMiddleware extends Middleware {
  async process(inlineQuery) { // eslint-disable-line
    await User.createOrUpdate({
      id: inlineQuery.from.id,
      isBot: inlineQuery.from.isBot,
      firstName: inlineQuery.from.firstName,
      lastName: inlineQuery.from.lastName,
      username: inlineQuery.from.username,
    });

    return inlineQuery;
  }
}

module.exports = DataSaverMiddleware;
