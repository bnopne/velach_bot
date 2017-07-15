class MessageHandler {

  constructor(message, bot, db) {
    this._message = message;
    this._bot = bot;
    this._db = db;
  };

  async handleMessage() {
    var chat = this._extractChat();
    var user = this._extractUser();

    await this._db.chatsAndUsers.makeSureChatAndUserExist(chat, user);

    if ('new_chat_member' in this._message) {
      await this._handleNewChatMember();
    };
  };

  _extractChat() {
    return this._message.chat;
  };

  _extractUser() {
    return this._message.from || null;
  };

  _extractNewChatMember() {
    if ('new_chat_member' in this._message) {
      return this._message.new_chat_member;
    } else {
      throw new Error('no new chat member in message');
    };
  };

  async _handleNewChatMember() {
    await this._db.chatsAndUsers.makeSureChatAndUserExist(
      this._extractChat(),
      this._extractNewChatMember()
    );

    var greetingMessage = await this._db.chatsAndUsers.getChatGreetingMessage(this._extractChat());

    if (!greetingMessage) {
      greetingMessage = 'test';
    };

    var msgText = this._concatUserAndGreetingMessage(
      this._extractNewChatMember(),
      greetingMessage
    );

    await this._bot.sendMessage(
      this._extractChat().id,
      msgText
    );
  };

  _concatUserAndGreetingMessage(user, greetingMessage) {
    return (user.username)
      ? `${userMention} ${greetingMessage}`.trim()
      : greetingMessage;
  };

};

module.exports = MessageHandler;
