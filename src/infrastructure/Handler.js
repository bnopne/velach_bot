const { NotImplementedError } = require('./errors');

class Handler {
  constructor(bot, eventBus) {
    this.bot = bot;
    this.eventBus = eventBus;
  }

  async handle() { // eslint-disable-line
    throw new NotImplementedError();
  }
}

module.exports = Handler;
