const Handler = require('../../../infrastructure/Handler');
const Bikecheck = require('../../../entities/Bikecheck');
const User = require('../../../entities/User');
const messages = require('../../../text/messages');
const { editDeletedBikecheckMessage } = require('../../common/bikecheck-utils');

class RestoreBikecheckHandler extends Handler {
  async handle(callbackQuery) {
    const user = await User.findById(callbackQuery.from.id);
    const bikecheck = await Bikecheck.findById(callbackQuery.data.getField('bikecheckId'));

    if (user.id !== bikecheck.userId) {
      await this.bot.answerCallbackQuery(
        callbackQuery.id,
        { text: messages.restoreBikecheck.onlyOwnerCanDoThat() },
      );
      return;
    }

    await bikecheck.setActive();

    const bikechecks = await Bikecheck.findDeletedForUser(user);

    if (!bikechecks.length) {
      await this.bot.editMessageMedia(
        {
          type: 'photo',
          media: 'https://cdn.pixabay.com/photo/2013/04/01/11/00/no-biking-98885__340.png',
          caption: messages.restoreBikecheck.noBikechecks(),
          parse_mode: 'markdown',
        },
        {
          chat_id: callbackQuery.message.chat.id,
          message_id: callbackQuery.message.messageId,
        },
      );

      await this.bot.answerCallbackQuery(callbackQuery.id, {});
      return;
    }

    const nextBikecheck = bikechecks[0];
    const bikecheckOwner = await User.findById(bikecheck.userId);

    await editDeletedBikecheckMessage({
      bot: this.bot,
      bikecheck: nextBikecheck,
      bikecheckOwner,
      userBikechecks: bikechecks,
      callbackQuery,
    });

    await this.bot.answerCallbackQuery(
      callbackQuery.id,
      { text: messages.restoreBikecheck.done() },
    );
  }
}

module.exports = RestoreBikecheckHandler;
