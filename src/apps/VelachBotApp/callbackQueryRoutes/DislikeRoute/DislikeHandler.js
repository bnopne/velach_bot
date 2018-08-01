const Handler = require('../../../../infrastructure/Handler');
const Bikecheck = require('../../../../entities/Bikecheck');
const BikecheckVote = require('../../../../entities/BikecheckVote');
const User = require('../../../../entities/User');
const BikecheckService = require('../../../../services/BikecheckService');


class DislikeHandler extends Handler {
  async handle(callbackQuery) {
    const user = await User.findById(callbackQuery.from.id);
    const bikecheck = await Bikecheck.findById(callbackQuery.data.getField('bikecheckId'));

    if (user.id === bikecheck.userId) {
      await this.bot.answerCallbackQuery(
        callbackQuery.id,
        { text: 'Вы не можете голосовать против своего байка' },
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

    const service = new BikecheckService();

    const caption = await service.getCaption(bikecheck);

    if (needToUpdateCaption) {
      await this.bot.editMessageCaption(
        caption,
        {
          chat_id: callbackQuery.message.chat.id,
          message_id: callbackQuery.message.messageId,
          reply_markup: service.getKeyboard(bikecheck).export(),
        },
      );
    }

    await this.bot.answerCallbackQuery(
      callbackQuery.id,
      { text: 'Ваш голос учтен' },
    );
  }
}


module.exports = DislikeHandler;
