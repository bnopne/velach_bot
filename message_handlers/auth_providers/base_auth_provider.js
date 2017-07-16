class BaseAuthProvider {

  constructor(message, bot) {
    this._message = message;
    this._bot = bot;
  };

  async isAuthorized() {
    throw new Error('not implemented');
  };

};

module.exports = BaseAuthProvider;
