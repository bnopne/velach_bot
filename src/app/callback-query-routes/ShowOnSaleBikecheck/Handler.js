const Handler = require('../../../infrastructure/Handler');
const Bikecheck = require('../../../entities/Bikecheck');
const User = require('../../../entities/User');
const Chat = require('../../../entities/Chat');
const { editOnSaleBikecheckMessage } = require('../../common/bikecheck-utils');

class ShowOnSaleBikecheckHandler extends Handler {
  async handle(callbackQuery) {
    const position = callbackQuery.data.getField('position');

    if (position < 1) {
      await this.bot.answerCallbackQuery(callbackQuery.id, {});
      return;
    }

    const bikecheck = await Bikecheck.findOnSale(position);

    if (!bikecheck) {
      await this.bot.answerCallbackQuery(callbackQuery.id, {});
      return;
    }

    const bikecheckOwner = await User.findById(bikecheck.userId);
    const chat = await Chat.findById(callbackQuery.message.chat.id);

    await editOnSaleBikecheckMessage({
      bot: this.bot,
      callbackQuery,
      chat,
      bikecheck,
      bikecheckOwner,
      position,
    });

    await this.bot.answerCallbackQuery(callbackQuery.id, {});
  }
}

module.exports = ShowOnSaleBikecheckHandler;
