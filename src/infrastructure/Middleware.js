const { NotImplementedError } = require('./errors');

class Middleware {
  constructor(bot, eventBus) {
    this.bot = bot;
    this.eventBus = eventBus;
  }

  async process() { // eslint-disable-line
    throw new NotImplementedError();
  }
}

module.exports = Middleware;
