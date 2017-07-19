class TelegramChat {

  constructor(rawChat) {
    this._rawChat = rawChat;
  };

  getId() {
    return this._rawChat.id;
  };

  getFullInfo() {
    return {
      id: this.getId()
    };
  };

};

module.exports = TelegramChat;
