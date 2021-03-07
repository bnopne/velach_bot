const Handler = require('../../../infrastructure/Handler');
const Bikecheck = require('../../../entities/Bikecheck');
const User = require('../../../entities/User');
const messages = require('../../../text/messages');
const { editDeletedBikecheckMessage } = require('../../common/bikecheck-utils');

class PreviousDeletedBikecheckHandler extends Handler {
  async handle(callbackQuery) {
    const bikecheck = await Bikecheck.findById(callbackQuery.data.getField('bikecheckId'));
    const bikecheckOwner = await User.findById(bikecheck.userId);
    const userBikechecks = await Bikecheck.findDeletedForUser(bikecheckOwner);

    if (!userBikechecks.length) {
      await this.bot.answerCallbackQuery(
        callbackQuery.id,
        { text: messages.bikecheck.nothingToShow() },
      );
      return;
    }

    if (userBikechecks.length === 1) {
      await this.bot.answerCallbackQuery(callbackQuery.id, {});
      return;
    }

    const currentBikecheckIndex = userBikechecks.findIndex((b) => b.id === bikecheck.id);

    if (currentBikecheckIndex === -1) {
      await this.bot.answerCallbackQuery(
        callbackQuery.id,
        { text: messages.common.error() },
      );
      return;
    }

    const previousBikecheckIndex = currentBikecheckIndex === 0
      ? userBikechecks.length - 1
      : currentBikecheckIndex - 1;

    const nextBikecheck = userBikechecks[previousBikecheckIndex];

    await editDeletedBikecheckMessage({
      bot: this.bot,
      callbackQuery,
      bikecheck: nextBikecheck,
      bikecheckIndex: previousBikecheckIndex,
      userBikechecks,
      bikecheckOwner,
    });

    await this.bot.answerCallbackQuery(callbackQuery.id, {});
  }
}

module.exports = PreviousDeletedBikecheckHandler;
