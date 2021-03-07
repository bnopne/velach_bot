const Handler = require('../../../infrastructure/Handler');
const Bikecheck = require('../../../entities/Bikecheck');
const User = require('../../../entities/User');
const { getTopBikecheckKeyboard } = require('../../../text/keyboards');
const { getTopCaption } = require('../../../text/captions');
const messages = require('../../../text/messages');
const settings = require('../../../settings');

class TopBikecheckHandler extends Handler {
  async handle(callbackQuery) {
    const topPosition = callbackQuery.data.getField('position');

    if (!topPosition) {
      await this.bot.answerCallbackQuery(callbackQuery.id, {});
      return;
    }

    const topLength = settings.get('bikechecks.topLength');

    if (topPosition < 1 || topPosition > topLength) {
      await this.bot.answerCallbackQuery(callbackQuery.id, { text: messages.common.error() });
      return;
    }
    const bikechecks = await Bikecheck.getTop(topLength);

    const nextBikecheck = bikechecks[topPosition - 1];

    if (!nextBikecheck) {
      await this.bot.answerCallbackQuery(callbackQuery.id, { text: messages.common.error() });
      return;
    }

    const nextBikecheckOwner = await User.findById(nextBikecheck.userId);

    const { likes, dislikes } = await nextBikecheck.getScore();

    await this.bot.editMessageMedia(
      {
        type: 'photo',
        media: nextBikecheck.telegramImageId,
        caption: getTopCaption(
          topPosition,
          likes,
          dislikes,
          nextBikecheckOwner,
          nextBikecheck.onSale,
        ),
        parse_mode: 'markdown',
      },
      {
        chat_id: callbackQuery.message.chat.id,
        message_id: callbackQuery.message.messageId,
        reply_markup: getTopBikecheckKeyboard(topPosition).export(),
      },
    );

    await this.bot.answerCallbackQuery(callbackQuery.id, {});
  }
}

module.exports = TopBikecheckHandler;
