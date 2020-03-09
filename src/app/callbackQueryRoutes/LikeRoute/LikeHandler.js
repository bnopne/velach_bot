const Handler = require('../../../infrastructure/Handler');
const Bikecheck = require('../../../entities/Bikecheck');
const BikecheckVote = require('../../../entities/BikecheckVote');
const User = require('../../../entities/User');
const { getBikecheckKeyboard } = require('../../../text/keyboards');
const { getBikecheckCaption } = require('../../../text/captions');
const messages = require('../../../text/messages');
const UserSendsCallbackQuery = require('../../../infrastructure/events/UserSendsCallbackQuery');
const { EVENT_TYPES } = require('../../../infrastructure/events/constants');

class LikeHandler extends Handler {
  async handle(callbackQuery) {
    this.eventBus.emit(
      EVENT_TYPES.USER_SENDS_CALLBACK_QUERY,
      new UserSendsCallbackQuery(callbackQuery.from.id),
    );

    const user = await User.findById(callbackQuery.from.id);
    const bikecheck = await Bikecheck.findById(callbackQuery.data.getField('bikecheckId'));
    const bikecheckOwnerId = await User.findById(bikecheck.userId);

    if (user.id === bikecheck.userId) {
      await this.bot.answerCallbackQuery(
        callbackQuery.id,
        { text: messages.like.cantVoteForOwnBike() },
      );
      return;
    }

    const currentUserVote = await BikecheckVote.getForBikecheckByUser(bikecheck, user);

    const needToUpdateCaption = !currentUserVote || (currentUserVote.isDislike);

    if (!currentUserVote) {
      await BikecheckVote.createUpVote(bikecheck, callbackQuery.from);
    }

    if (currentUserVote && currentUserVote.isDislike) {
      await currentUserVote.toggleUp();
    }

    const { likes, dislikes } = await bikecheck.getScore();

    if (needToUpdateCaption) {
      await this.bot.editMessageCaption(
        getBikecheckCaption(likes, dislikes, bikecheckOwnerId.stravaLink),
        {
          chat_id: callbackQuery.message.chat.id,
          message_id: callbackQuery.message.messageId,
          reply_markup: getBikecheckKeyboard(bikecheck).export(),
          parse_mode: 'markdown',
        },
      );
    }

    await this.bot.answerCallbackQuery(
      callbackQuery.id,
      { text: messages.like.done() },
    );
  }
}

module.exports = LikeHandler;
