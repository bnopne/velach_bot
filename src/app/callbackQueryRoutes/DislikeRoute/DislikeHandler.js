const Handler = require('../../../infrastructure/Handler');
const Bikecheck = require('../../../entities/Bikecheck');
const BikecheckVote = require('../../../entities/BikecheckVote');
const User = require('../../../entities/User');
const Chat = require('../../../entities/Chat');
const { getBikecheckKeyboard } = require('../../../text/keyboards');
const { getBikecheckCaption } = require('../../../text/captions');
const messages = require('../../../text/messages');
const UserSendsCallbackQuery = require('../../../infrastructure/events/UserSendsCallbackQuery');
const { EVENT_TYPES } = require('../../../infrastructure/events/constants');

class DislikeHandler extends Handler {
  async handle(callbackQuery) {
    this.eventBus.emit(
      EVENT_TYPES.USER_SENDS_CALLBACK_QUERY,
      new UserSendsCallbackQuery(callbackQuery.from.id),
    );

    const user = await User.findById(callbackQuery.from.id);
    const bikecheck = await Bikecheck.findById(callbackQuery.data.getField('bikecheckId'));

    if (user.id === bikecheck.userId) {
      await this.bot.answerCallbackQuery(
        callbackQuery.id,
        { text: messages.dislike.cantVoteAgainstOwnBike() },
      );
      return;
    }

    const currentDonorVote = await BikecheckVote.getForBikecheckByUser(bikecheck, user);

    const needToUpdateCaption = !currentDonorVote || (currentDonorVote.isLike);

    if (currentDonorVote && currentDonorVote.isLike) {
      await currentDonorVote.toggleDown();
    }

    if (!currentDonorVote) {
      await BikecheckVote.createDownVote(bikecheck, callbackQuery.from);
    }

    if (needToUpdateCaption) {
      const chat = await Chat.findById(callbackQuery.message.chat.id);
      const bikecheckOwner = await User.findById(bikecheck.userId);
      const { likes, dislikes } = await bikecheck.getScore();
      const rank = await bikecheck.getRank();
      const bikechecks = await Bikecheck.findActiveForChat(bikecheckOwner, chat);
      const bikecheckIndex = bikechecks.findIndex((b) => b.id === bikecheck.id);

      await this.bot.editMessageCaption(
        getBikecheckCaption(
          likes,
          dislikes,
          bikecheckOwner.stravaLink,
          bikecheckIndex,
          bikechecks.length,
          rank,
        ),
        {
          chat_id: callbackQuery.message.chat.id,
          message_id: callbackQuery.message.messageId,
          reply_markup: getBikecheckKeyboard(bikecheck, chat).export(),
          parse_mode: 'markdown',
        },
      );
    }

    await this.bot.answerCallbackQuery(
      callbackQuery.id,
      { text: messages.dislike.done() },
    );
  }
}

module.exports = DislikeHandler;
