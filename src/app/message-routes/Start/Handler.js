const Handler = require('../../../infrastructure/Handler');
const messages = require('../../../text/messages');

class StartHandler extends Handler {
  async handle(message) {
    await this.bot.sendMessage(
      message.chat.id,
      messages.start.start(),
      {
        reply_to_message_id: message.messageId,
        parse_mode: 'markdown',
      },
    );
  }
}

module.exports = StartHandler;
