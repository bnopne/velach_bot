const BaseMessageHandler = require('./base_message_handler');

class NewChatMemberHandler extends BaseMessageHandler {

  async fitsMessage() {
    return this._message.getNewChatMember() !== null;
  };

  async handle() {
    await this._db.chatsAndUsers.makeSureChatAndUserExist(
      this._message.getChat(),
      this._message.getNewChatMember()
    );

    var botData = await this._bot.getMe();

    if (this._message.getNewChatMember().getId() == botData.id) {
      return;
    };

    var greetingMessage = await this._db.chatsAndUsers.getChatGreetingMessage(this._message.getChat());

    if (!greetingMessage) {
      return;
    };

    var msgText = this._concatUserAndGreetingMessage(
      this._message.getNewChatMember(),
      greetingMessage
    );

    await this._bot.sendMessage(
      this._message.getChat().getId(),
      msgText
    );
  };

  _concatUserAndGreetingMessage(user, greetingMessage) {
    return (user.getUsername())
      ? `@${user.getUsername()} ${greetingMessage}`.trim()
      : greetingMessage;
  };

};

module.exports = NewChatMemberHandler;
