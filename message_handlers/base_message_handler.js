class BaseMessageHandler {

  constructor(message, bot, db) {
    this._message = message;
    this._bot = bot;
    this._db = db;

    this.handle = this._wrapHandle(this.handle);
  };

  async handle() {
    throw new Error('not implemented');
  };

  _wrapHandle(handle) {

    return async () => {
      await this._db.chatsAndUsers.makeSureChatAndUserExist(
        this._message.getChat(),
        this._message.getSender()
      );

      await handle.apply(this, []);
    };

  };

};

module.exports = BaseMessageHandler;
