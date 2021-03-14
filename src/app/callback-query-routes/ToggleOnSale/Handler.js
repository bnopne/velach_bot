const Handler = require('../../../infrastructure/Handler');
const Bikecheck = require('../../../entities/Bikecheck');
const User = require('../../../entities/User');
const messages = require('../../../text/messages');
const { editBikecheckMessage } = require('../../common/bikecheck-utils');

class ToggleOnSaleHandler extends Handler {
  async handle(callbackQuery) {
    const bikecheck = await Bikecheck.findById(callbackQuery.data.getField('bikecheckId'));

    if (!bikecheck) {
      await await this.bot.answerCallbackQuery(callbackQuery.id, { text: messages.common.error() });
      return;
    }

    await bikecheck.toggleOnSale();
    const bikecheckOwner = await User.findById(bikecheck.userId);
    const bikechecks = await Bikecheck.findActiveForUser(bikecheckOwner);

    if (!bikechecks.length) {
      await this.bot.answerCallbackQuery(
        callbackQuery.id,
        { text: messages.bikecheck.nothingToShow() },
      );
      return;
    }

    await editBikecheckMessage({
      bot: this.bot,
      bikecheck,
      bikecheckOwner,
      callbackQuery,
      userBikechecks: bikechecks,
    });

    await this.bot.answerCallbackQuery(callbackQuery.id, {});
  }
}

module.exports = ToggleOnSaleHandler;
