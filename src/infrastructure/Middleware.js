const { NotImplementedError } = require('./errors');

class Middleware {
  constructor(bot) {
    this.bot = bot;
  }

  async process() { // eslint-disable-line
    throw new NotImplementedError();
  }
}

module.exports = Middleware;
