const BaseCommandHandler = require('./base_command_handler');
const ChatAdminAuthProvider = require('../auth_providers').ChatAdminAuthProvider;

class SetGreetingMessageHandler extends BaseCommandHandler {

  _getCommand() {
    return 'set_greeting';
  };

  _getAuthProvider() {
    return new ChatAdminAuthProvider(this._message, this._bot);
  };

  _parseCommandArguments() {
    return {
      greetingMessage: this._message.text.split(`/${this._getCommand()} `)[1] || ''
    };
  };

  async handle() {
    await this._db.chatsAndUsers.setGreetingMessage(
      this._extractChat(),
      this._commandArguments.greetingMessage
    );

    await this._bot.sendMessage(this._extractChat().id, 'OK');
  };

};

module.exports = SetGreetingMessageHandler;
