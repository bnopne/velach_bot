const Handler = require('../../../infrastructure/Handler');
const UserExecutesCommand = require('../../../infrastructure/events/UserExecutesCommand');
const Chat = require('../../../entities/Chat');
const { EVENT_TYPES } = require('../../../infrastructure/events/constants');
const commands = require('../../../text/commands');

class AnnounceHandler extends Handler {
  async handle(message) {
    this.eventBus.emit(
      EVENT_TYPES.USER_EXECUTES_COMMAND,
      new UserExecutesCommand(commands.bikecheck, message.from.id, message.chat.id),
    );

    if (!message.replyToMessage) {
      await this.bot.sendMessage(message.chat.id, 'Ответь на сообщение с анонсом');
      return;
    }

    if (message.replyToMessage.from.id !== message.from.id) {
      await this.bot.sendMessage(message.chat.id, 'Ответь на свое сообщение с анонсом');
      return;
    }

    const chats = await Chat.findAllPublic();

    chats.forEach(async (chat) => {
      try {
        await this.bot.sendMessage(
          chat.id,
          message.replyToMessage.text,
          {
            parse_mode: 'markdown',
          },
        );
      } catch (err) {
        console.error(err);
      }
    });
  }
}

module.exports = AnnounceHandler;
