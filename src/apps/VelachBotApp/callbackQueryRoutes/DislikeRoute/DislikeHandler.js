const Handler = require('../../../../infrastructure/Handler');
const Bikecheck = require('../../../../entities/Bikecheck');
const BikecheckVote = require('../../../../entities/BikecheckVote');
const User = require('../../../../entities/User');
const { getBikecheckKeyboard } = require('../../../../text/keyboards');
const { getBikecheckCaption } = require('../../../../text/captions');
const messages = require('../../../../text/messages');

class DislikeHandler extends Handler {
  async handle(callbackQuery) {
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

    const { likes, dislikes } = await bikecheck.getScore();

    if (needToUpdateCaption) {
      await this.bot.editMessageCaption(
        getBikecheckCaption(likes, dislikes, user.stravaLink),
        {
          chat_id: callbackQuery.message.chat.id,
          message_id: callbackQuery.message.messageId,
          reply_markup: getBikecheckKeyboard(bikecheck).export(),
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
