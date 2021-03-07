const Handler = require('../../../infrastructure/Handler');
const Bikecheck = require('../../../entities/Bikecheck');
const User = require('../../../entities/User');
const { getDeletedBikecheckKeyboard } = require('../../../text/keyboards');
const { getBikecheckCaption } = require('../../../text/captions');
const messages = require('../../../text/messages');

class RestoreBikecheckHandler extends Handler {
  async handle(callbackQuery) {
    const user = await User.findById(callbackQuery.from.id);
    const bikecheck = await Bikecheck.findById(callbackQuery.data.getField('bikecheckId'));

    if (user.id !== bikecheck.userId) {
      await this.bot.answerCallbackQuery(
        callbackQuery.id,
        { text: messages.restoreBikecheck.onlyOwnerCanDoThat() },
      );
      return;
    }

    await bikecheck.setActive();

    const bikechecks = await Bikecheck.findDeletedForUser(user);

    if (!bikechecks.length) {
      await this.bot.editMessageMedia(
        {
          type: 'photo',
          media: 'https://cdn.pixabay.com/photo/2013/04/01/11/00/no-biking-98885__340.png',
          caption: messages.restoreBikecheck.noBikechecks(),
          parse_mode: 'markdown',
        },
        {
          chat_id: callbackQuery.message.chat.id,
          message_id: callbackQuery.message.messageId,
        },
      );

      await this.bot.answerCallbackQuery(callbackQuery.id, {});
      return;
    }

    const nextBikecheck = bikechecks[0];
    const { likes, dislikes } = await nextBikecheck.getScore();
    const bikecheckOwner = await User.findById(bikecheck.userId);

    await this.bot.editMessageMedia(
      {
        type: 'photo',
        media: nextBikecheck.telegramImageId,
        caption: getBikecheckCaption(
          likes,
          dislikes,
          bikecheckOwner.stravaLink,
          0,
          bikechecks.length,
          -1,
          nextBikecheck.onSale,
        ),
        parse_mode: 'markdown',
      },
      {
        chat_id: callbackQuery.message.chat.id,
        message_id: callbackQuery.message.messageId,
        reply_markup: getDeletedBikecheckKeyboard(nextBikecheck).export(),
      },
    );

    await this.bot.answerCallbackQuery(
      callbackQuery.id,
      { text: messages.restoreBikecheck.done() },
    );
  }
}

module.exports = RestoreBikecheckHandler;
