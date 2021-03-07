const Handler = require('../../../infrastructure/Handler');
const Bikecheck = require('../../../entities/Bikecheck');
const User = require('../../../entities/User');
const { getTopSellingCaption } = require('../../../text/captions');
const settings = require('../../../settings');
const { getTopSellingBikecheckKeyboard } = require('../../../text/keyboards');
const messages = require('../../../text/messages');

class TopSellingHandler extends Handler {
  async handle(message) {
    const topLength = settings.get('bikechecks.topLength');
    const bikechecks = await Bikecheck.getTop(topLength, true);

    if (!bikechecks.length) {
      await this.bot.sendMessage(
        message.chat.id,
        messages.topSelling.noBikesForSale(),
        {
          reply_to_message_id: message.messageId,
        },
      );

      return;
    }

    const bikecheck = bikechecks[0];
    const bikecheckOwner = await User.findById(bikecheck.userId);

    await this.bot.sendPhoto(
      message.chat.id,
      bikecheck.telegramImageId,
      {
        reply_to_message_id: message.messageId,
        caption: getTopSellingCaption(1, bikecheckOwner),
        reply_markup: getTopSellingBikecheckKeyboard(1).export(),
        parse_mode: 'markdown',
      },
    );
  }
}

module.exports = TopSellingHandler;
