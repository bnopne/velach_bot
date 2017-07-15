class MessageHandler {

  constructor(message, db) {
    this._message = message;
    this._db = db;
  };

  async handleMessage() {
    console.error('OOPS NOT IMPLEMENTED!');
  };

};

module.exports = MessageHandler;
