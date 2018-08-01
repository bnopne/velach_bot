const { NotImplementedError } = require('./errors');


class Handler {
  constructor(bot) {
    this.bot = bot;
  }

  async handle() { // eslint-disable-line
    throw new NotImplementedError();
  }
}


module.exports = Handler;
