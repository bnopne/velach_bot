const Handler = require('../../../infrastructure/Handler');
const Bikecheck = require('../../../entities/Bikecheck');
const messages = require('../../../text/messages');

class BumpOnSaleBikecheckHandler extends Handler {
  async handle(callbackQuery) {
    const bikecheckId = callbackQuery.data.getField('bikecheckId');

    const bikecheck = await Bikecheck.findById(bikecheckId);
    await bikecheck.bumpSaleRank();

    await this.bot.answerCallbackQuery(callbackQuery.id, { text: messages.common.done() });
  }
}

module.exports = BumpOnSaleBikecheckHandler;
