const Handler = require('../../../infrastructure/Handler');
const Bikecheck = require('../../../entities/Bikecheck');
const User = require('../../../entities/User');
const { getDeletedBikecheckKeyboard } = require('../../../text/keyboards');
const { getBikecheckCaption } = require('../../../text/captions');
const UserSendsCallbackQuery = require('../../../infrastructure/events/UserSendsCallbackQuery');
const { EVENT_TYPES } = require('../../../infrastructure/events/constants');
const messages = require('../../../text/messages');

class PreviousDeletedBikecheckHandler extends Handler {
  async handle(callbackQuery) {
    this.eventBus.emit(
      EVENT_TYPES.USER_SENDS_CALLBACK_QUERY,
      new UserSendsCallbackQuery(callbackQuery.from.id),
    );

    const bikecheck = await Bikecheck.findById(callbackQuery.data.getField('bikecheckId'));
    const bikecheckOwner = await User.findById(bikecheck.userId);
    const bikechecks = await Bikecheck.findDeletedForUser(bikecheckOwner);

    if (!bikechecks.length) {
      await this.bot.answerCallbackQuery(
        callbackQuery.id,
        { text: messages.bikecheck.nothingToShow() },
      );
      return;
    }

    if (bikechecks.length === 1) {
      await this.bot.answerCallbackQuery(callbackQuery.id, {});
      return;
    }

    let currentBikecheckIndex = bikechecks.findIndex((b) => b.id === bikecheck.id);

    if (currentBikecheckIndex === -1) {
      await this.bot.answerCallbackQuery(
        callbackQuery.id,
        { text: messages.common.error() },
      );
      return;
    }

    if (currentBikecheckIndex === 0) {
      currentBikecheckIndex = bikechecks.length;
    }

    const nextBikecheck = bikechecks[currentBikecheckIndex - 1];

    const { likes, dislikes } = await nextBikecheck.getScore();

    await this.bot.editMessageMedia(
      {
        type: 'photo',
        media: nextBikecheck.telegramImageId,
        caption: getBikecheckCaption(
          likes,
          dislikes,
          bikecheckOwner.stravaLink,
          currentBikecheckIndex + 1,
          bikechecks.length,
          -1,
        ),
        parse_mode: 'markdown',
      },
      {
        chat_id: callbackQuery.message.chat.id,
        message_id: callbackQuery.message.messageId,
        reply_markup: getDeletedBikecheckKeyboard(nextBikecheck).export(),
      },
    );

    await this.bot.answerCallbackQuery(callbackQuery.id, {});
  }
}

module.exports = PreviousDeletedBikecheckHandler;
