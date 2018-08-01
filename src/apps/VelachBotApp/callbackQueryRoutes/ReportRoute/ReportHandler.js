const Handler = require('../../../../infrastructure/Handler');
const User = require('../../../../entities/User');
const Bikecheck = require('../../../../entities/Bikecheck');
const BikecheckReport = require('../../../../entities/BikecheckReport');
const BikecheckService = require('../../../../services/BikecheckService');


class ReportHandler extends Handler {
  async handle(callbackQuery) {
    const reporter = await User.findById(callbackQuery.from.id);
    const bikecheck = await Bikecheck.findById(callbackQuery.data.getField('bikecheckId'));

    if (reporter.id === bikecheck.userId) {
      await this.bot.answerCallbackQuery(
        callbackQuery.id,
        { text: 'Вы не можете жаловаться на свой байк' },
      );
      return;
    }

    const currentReport = await BikecheckReport.getForBikecheckByUser(bikecheck, reporter);

    if (!currentReport) {
      await BikecheckReport.createForBikecheckByUser(bikecheck, reporter);

      await this.bot.answerCallbackQuery(
        callbackQuery.id,
        { text: 'Ваша жалоба учтена' },
      );
    } else {
      await currentReport.delete();

      await this.bot.answerCallbackQuery(
        callbackQuery.id,
        { text: 'Ваша жалоба удалена' },
      );
    }

    const service = new BikecheckService();
    const caption = await service.getCaption(bikecheck);

    await this.bot.editMessageCaption(
      caption,
      {
        chat_id: callbackQuery.message.chat.id,
        message_id: callbackQuery.message.messageId,
        reply_markup: service.getKeyboard(bikecheck).export(),
      },
    );
  }
}


module.exports = ReportHandler;
