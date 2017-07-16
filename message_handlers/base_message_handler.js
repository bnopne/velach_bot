class BaseMessageHandler {

  constructor(message, bot, db) {
    this._message = message;
    this._bot = bot;
    this._db = db;

    this.handle = this._wrapHandle(this.handle);
  };

  _extractChat() {
    return this._message.chat;
  };

  _extractUser() {
    return this._message.from || null;
  };

  async handle() {
    throw new Error('not implemented');
  };

  _wrapHandle(handle) {

    return async () => {
      const chat = this._extractChat();
      const user = this._extractUser();

      await this._db.chatsAndUsers.makeSureChatAndUserExist(chat, user);

      await handle.apply(this, []);
    };

  };

};

module.exports = BaseMessageHandler;
