const Handler = require('../../../infrastructure/Handler');
const Bikecheck = require('../../../entities/Bikecheck');
const BikecheckVote = require('../../../entities/BikecheckVote');
const User = require('../../../entities/User');
const messages = require('../../../text/messages');
const { editBikecheckMessage } = require('../../common/bikecheck-utils');

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

    if (needToUpdateCaption) {
      const bikecheckOwner = await User.findById(bikecheck.userId);
      const bikechecks = await Bikecheck.findActiveForUser(bikecheckOwner);

      await editBikecheckMessage({
        bot: this.bot,
        bikecheck,
        bikecheckOwner,
        callbackQuery,
        userBikechecks: bikechecks,
      });
    }

    await this.bot.answerCallbackQuery(
      callbackQuery.id,
      { text: messages.dislike.done() },
    );
  }
}

module.exports = DislikeHandler;
