const Handler = require('../../../infrastructure/Handler');
const Bikecheck = require('../../../entities/Bikecheck');
const User = require('../../../entities/User');
const Chat = require('../../../entities/Chat');
const messages = require('../../../text/messages');
const { getOnSaleBikecheckKeyboard } = require('../../../text/keyboards');
const { getTopSellingCaption } = require('../../../text/captions');

class OnSaleHandler extends Handler {
  async handle(message) {
    const bikecheck = await Bikecheck.findOnSale(1);

    if (!bikecheck) {
      await this.bot.sendMessage(
        message.chat.id,
        messages.onSale.noBikesOnSale(),
        {
          reply_to_message_id: message.messageId,
        },
      );
    }

    const bikecheckOwner = await User.findById(bikecheck.userId);
    const chat = await Chat.findById(message.chat.id);

    await this.bot.sendPhoto(
      message.chat.id,
      bikecheck.telegramImageId,
      {
        reply_to_message_id: message.messageId,
        caption: getTopSellingCaption(1, bikecheckOwner),
        reply_markup: getOnSaleBikecheckKeyboard(1, bikecheck, chat).export(),
        parse_mode: 'markdown',
      },
    );
  }
}

module.exports = OnSaleHandler;
