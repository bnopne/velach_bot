const BaseCommandHandler = require('./base_command_handler');
const ChatAdminAuthProvider = require('../auth_providers').ChatAdminAuthProvider;

class SetGreetingMessageHandler extends BaseCommandHandler {

  _getCommand() {
    return 'setgreeting';
  };

  _getAuthProvider() {
    return new ChatAdminAuthProvider(this._message, this._bot);
  };

  _parseCommandArguments() {
    return {
      greetingMessage: this._message.getText().split(`/${this._getCommand()} `)[1] || ''
    };
  };

  async handle() {
    await this._db.chatsAndUsers.setGreetingMessage(
      this._message.getChat().getId(),
      this._commandArguments.greetingMessage
    );

    await this._bot.sendMessage(this._message.getChat().getId(), 'OK');
  };

};

module.exports = SetGreetingMessageHandler;
