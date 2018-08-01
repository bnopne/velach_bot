const Handler = require('../../../../infrastructure/Handler');
const User = require('../../../../entities/User');
const Bikecheck = require('../../../../entities/Bikecheck');
const Chat = require('../../../../entities/Chat');
const BikecheckService = require('../../../../services/BikecheckService');


class BikecheckHandler extends Handler {
  async handle(message) {
    const service = new BikecheckService();

    const user = message.replyToMessage
      ? await User.findById(message.replyToMessage.from.id)
      : await User.findById(message.from.id);

    const bikecheck = await Bikecheck.findActiveForUser(user);

    if (!bikecheck) {
      await this.bot.sendMessage(
        message.chat.id,
        'Этот беспруфный кукарек не показывал свою повозку!',
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
        'Повозка этого велана была признана неподходящей и забанена с позором!',
        {
          reply_to_message_id: message.messageId,
        },
      );

      return;
    }

    const keyboard = service.getKeyboard(bikecheck);
    const caption = await service.getCaption(bikecheck);

    await this.bot.sendPhoto(
      message.chat.id,
      bikecheck.telegramImageId,
      {
        reply_to_message_id: message.messageId,
        caption,
        reply_markup: keyboard.export(),
      },
    );
  }
}


module.exports = BikecheckHandler;
