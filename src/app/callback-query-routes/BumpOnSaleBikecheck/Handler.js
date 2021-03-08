const Handler = require('../../../infrastructure/Handler');
const Bikecheck = require('../../../entities/Bikecheck');

class BumpOnSaleBikecheckHandler extends Handler {
  async handle(callbackQuery) {
    const bikecheckId = callbackQuery.data.getField('bikecheckId');

    const bikecheck = await Bikecheck.findById(bikecheckId);
    await bikecheck.bumpSaleRank();

    await this.bot.answerCallbackQuery(callbackQuery.id, {});
  }
}

module.exports = BumpOnSaleBikecheckHandler;
