const BaseMessageHandler = require('./base_message_handler');

class NewChatMemberHandler extends BaseMessageHandler {

  async handle() {
    await this._db.chatsAndUsers.makeSureChatAndUserExist(
      this._extractChat(),
      this._extractNewChatMember()
    );

    var botData = await this._bot.getMe();

    if (this._extractNewChatMember().id == botData.id) {
      return;
    };

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

  _extractNewChatMember() {
    if ('new_chat_member' in this._message) {
      return this._message.new_chat_member;
    } else {
      throw new Error('no new chat member in message');
    };
  };

  _concatUserAndGreetingMessage(user, greetingMessage) {
    return (user.username)
      ? `${userMention} ${greetingMessage}`.trim()
      : greetingMessage;
  };

};

module.exports = NewChatMemberHandler;
