const Handler = require('../../../infrastructure/Handler');
const Bikecheck = require('../../../entities/Bikecheck');
const User = require('../../../entities/User');
const Chat = require('../../../entities/Chat');
const messages = require('../../../text/messages');
const { editBikecheckMessage } = require('../../common/bikecheck-utils');

class PreviousBikecheckHandler extends Handler {
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

    const previousBikecheckIndex = currentBikecheckIndex === 0
      ? userBikechecks.length - 1
      : currentBikecheckIndex - 1;

    const previousBikecheck = userBikechecks[previousBikecheckIndex];

    await editBikecheckMessage({
      bot: this.bot,
      callbackQuery,
      bikecheck: previousBikecheck,
      bikecheckIndex: previousBikecheckIndex,
      bikecheckOwner,
      chat,
      userBikechecks,
    });

    await this.bot.answerCallbackQuery(callbackQuery.id, {});
  }
}

module.exports = PreviousBikecheckHandler;
