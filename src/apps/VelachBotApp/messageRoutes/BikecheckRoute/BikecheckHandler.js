const Handler = require('../../../../infrastructure/Handler');
const User = require('../../../../entities/User');
const Bikecheck = require('../../../../entities/Bikecheck');
const Chat = require('../../../../entities/Chat');
const { getBikecheckCaption } = require('../../../../text/captions');
const { getBikecheckKeyboard } = require('../../../../text/keyboards');
const messages = require('../../../../text/messages');

class BikecheckHandler extends Handler {
  async handle(message) {
    const user = message.replyToMessage
      ? await User.findById(message.replyToMessage.from.id)
      : await User.findById(message.from.id);

    const bikecheck = await Bikecheck.findActiveForUser(user);

    if (!bikecheck) {
      await this.bot.sendMessage(
        message.chat.id,
        messages.bikecheck.doesntHaveBike(),
        {
          reply_to_message_id: message.messageId,
        },
      );

      return;
    }

    const chat = await Chat.findById(message.chat.id);
    const isBanned = await bikecheck.isBannedInChat(chat);

    if (isBanned) {
      await this.bot.sendMessage(
        message.chat.id,
        messages.bikecheck.bikeWasBanned(),
        {
          reply_to_message_id: message.messageId,
        },
      );

      return;
    }

    const { likes, dislikes } = await bikecheck.getScore();

    await this.bot.sendPhoto(
      message.chat.id,
      bikecheck.telegramImageId,
      {
        reply_to_message_id: message.messageId,
        caption: getBikecheckCaption(likes, dislikes, user.stravaLink),
        reply_markup: getBikecheckKeyboard(bikecheck).export(),
        parse_mode: 'markdown',
      },
    );
  }
}

module.exports = BikecheckHandler;
