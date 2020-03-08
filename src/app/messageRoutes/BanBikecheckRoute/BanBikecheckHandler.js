const Handler = require('../../../infrastructure/Handler');
const User = require('../../../entities/User');
const Chat = require('../../../entities/Chat');
const Bikecheck = require('../../../entities/Bikecheck');
const messages = require('../../../text/messages');

class BanBikecheckHandler extends Handler {
  async handle(message) {
    const repliedMessage = message.replyToMessage;

    if (!repliedMessage) {
      await this.bot.sendMessage(
        message.chat.id,
        messages.banBikecheck.replySomeone(),
      );

      return;
    }

    if (repliedMessage.from.id === message.from.id) {
      await this.bot.sendMessage(
        message.chat.id,
        messages.banBikecheck.cantBanOwnBike(),
      );

      return;
    }

    const user = await User.findById(repliedMessage.from.id);
    const bikecheck = await Bikecheck.findActiveForUser(user);

    if (!bikecheck) {
      await this.bot.sendMessage(
        message.chat.id,
        messages.banBikecheck.doesntHaveBike(),
      );

      return;
    }

    const chat = await Chat.findById(message.chat.id);
    await bikecheck.banInChat(chat);

    await this.bot.sendMessage(
      message.chat.id,
      messages.banBikecheck.done(),
    );
  }
}

module.exports = BanBikecheckHandler;