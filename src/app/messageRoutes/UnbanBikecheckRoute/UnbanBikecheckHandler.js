const Handler = require('../../../infrastructure/Handler');
const User = require('../../../entities/User');
const Chat = require('../../../entities/Chat');
const Bikecheck = require('../../../entities/Bikecheck');
const messages = require('../../../text/messages');
const UserExecutesCommand = require('../../../infrastructure/events/UserExecutesCommand');
const { EVENT_TYPES } = require('../../../infrastructure/events/constants');
const commands = require('../../../text/commands');

class UnbanBikecheckHandler extends Handler {
  async handle(message) {
    this.eventBus.emit(
      EVENT_TYPES.USER_EXECUTES_COMMAND,
      new UserExecutesCommand(commands.unbanBikecheck, message.from.id, message.chat.id),
    );

    const repliedMessage = message.replyToMessage;

    if (!repliedMessage) {
      await this.bot.sendMessage(
        message.chat.id,
        messages.unbanBikecheck.replySomeone(),
      );

      return;
    }

    if (repliedMessage.from.id === message.from.id) {
      await this.bot.sendMessage(
        message.chat.id,
        messages.unbanBikecheck.cantUnbanOwnBike(),
      );

      return;
    }

    const user = await User.findById(repliedMessage.from.id);
    const bikecheck = await Bikecheck.findActiveForUser(user);

    if (!bikecheck) {
      await this.bot.sendMessage(
        message.chat.id,
        messages.unbanBikecheck.doesntHaveBike(),
      );

      return;
    }

    const chat = await Chat.findById(message.chat.id);
    await bikecheck.unbanInChat(chat);

    await this.bot.sendMessage(
      message.chat.id,
      messages.unbanBikecheck.done(),
    );
  }
}

module.exports = UnbanBikecheckHandler;
