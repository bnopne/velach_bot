const Handler = require('../../../infrastructure/Handler');
const messages = require('../../../text/messages');
const UserExecutesCommand = require('../../../infrastructure/events/UserExecutesCommand');
const { EVENT_TYPES } = require('../../../infrastructure/events/constants');
const commands = require('../../../text/commands');

class HelpHandler extends Handler {
  async handle(message) {
    this.eventBus.emit(
      EVENT_TYPES.USER_EXECUTES_COMMAND,
      new UserExecutesCommand(commands.help, message.from.id, message.chat.id),
    );

    await this.bot.sendMessage(
      message.chat.id,
      messages.help.info(),
      {
        reply_to_message_id: message.messageId,
        parse_mode: 'markdown',
      },
    );
  }
}

module.exports = HelpHandler;
