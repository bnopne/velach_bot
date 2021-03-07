const Handler = require('../../../infrastructure/Handler');
const Bikecheck = require('../../../entities/Bikecheck');
const User = require('../../../entities/User');
const Chat = require('../../../entities/Chat');
const messages = require('../../../text/messages');
const { editBikecheckMessage } = require('../../common/bikecheck-utils');

class NextBikecheckHandler extends Handler {
  async handle(callbackQuery) {
    const bikecheck = await Bikecheck.findById(callbackQuery.data.getField('bikecheckId'));
    const bikecheckOwner = await User.findById(bikecheck.userId);
    const chat = await Chat.findById(callbackQuery.message.chat.id);
    const userBikechecks = await Bikecheck.findActiveForChat(bikecheckOwner, chat);

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

    const nextBikecheckIndex = currentBikecheckIndex === userBikechecks.length - 1
      ? 0
      : currentBikecheckIndex + 1;

    const nextBikecheck = userBikechecks[nextBikecheckIndex];

    editBikecheckMessage({
      bot: this.bot,
      callbackQuery,
      chat,
      bikecheck: nextBikecheck,
      bikecheckIndex: nextBikecheckIndex,
      bikecheckOwner,
      userBikechecks,
    });

    await this.bot.answerCallbackQuery(callbackQuery.id, {});
  }
}

module.exports = NextBikecheckHandler;
