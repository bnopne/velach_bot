const BaseCommandHandler = require('./base_command_handler');
const NoAuthProvider = require('../auth_providers').NoAuthProvider;

class GetBikecheckListHandler extends BaseCommandHandler {

  _getCommand() {
    return 'get_bikecheck_list';
  };

  _getAuthProvider() {
    return new NoAuthProvider(this._message, this._bot);
  };

  _parseCommandArguments() {
    return {
      chatId: this._message.getChat().getId(),
    };
  };

  async handle() {
    const list = await this._db.chatsAndUsers.getBikecheckList(this._commandArguments.chatId);

    const strList = list.map((el, i ,arr) => {
      return `${el.first_name} ${el.last_name} (@${el.username})`;
    });

    await this._bot.sendMessage(
      this._commandArguments.chatId,
      strList.join('\n')
    );
  };

};

module.exports = GetBikecheckListHandler;
