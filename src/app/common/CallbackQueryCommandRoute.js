const Route = require('../../infrastructure/Route');
const { NotImplementedError } = require('../../infrastructure/errors');
const { EVENT_TYPES } = require('../../infrastructure/events/constants');
const UserSendsCallbackQuery = require('../../infrastructure/events/UserSendsCallbackQuery');

class CallbackQueryCommandRoute extends Route {
  // eslint-disable-next-line class-methods-use-this
  getCommand() {
    throw new NotImplementedError();
  }

  isMatching(callbackQuery) {
    if (!callbackQuery.data) {
      return false;
    }

    return callbackQuery.data.command === this.getCommand();
  }

  process(callbackQuery) {
    this.eventBus.emit(
      EVENT_TYPES.USER_SENDS_CALLBACK_QUERY,
      new UserSendsCallbackQuery(
        this.getCommand(),
        callbackQuery.from.id,
        callbackQuery.message.chat.id,
      ),
    );

    return super.process(callbackQuery);
  }
}

module.exports = CallbackQueryCommandRoute;
