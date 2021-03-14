const Handler = require('../../../infrastructure/Handler');
const Bikecheck = require('../../../entities/Bikecheck');
const User = require('../../../entities/User');
const messages = require('../../../text/messages');
const { editBikecheckMessage } = require('../../common/bikecheck-utils');

class DeleteBikecheckHandler extends Handler {
  async handle(callbackQuery) {
    const user = await User.findById(callbackQuery.from.id);
    const bikecheck = await Bikecheck.findById(callbackQuery.data.getField('bikecheckId'));
    const bikecheckOwner = await User.findById(bikecheck.userId);

    if (user.id !== bikecheck.userId) {
      await this.bot.answerCallbackQuery(
        callbackQuery.id,
        { text: messages.deleteBikecheck.onlyOwnerCanDoThat() },
      );
      return;
    }

    await bikecheck.setInactive();

    const bikechecks = await Bikecheck.findActiveForUser(user);

    if (!bikechecks.length) {
      await this.bot.editMessageMedia(
        {
          type: 'photo',
          media: 'https://cdn.pixabay.com/photo/2013/04/01/11/00/no-biking-98885__340.png',
          caption: messages.common.noBikechecks(),
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

    await editBikecheckMessage({
      bot: this.bot,
      bikecheck: nextBikecheck,
      bikecheckOwner,
      callbackQuery,
      userBikechecks: bikechecks,
    });

    await this.bot.answerCallbackQuery(callbackQuery.id, { text: messages.deleteBikecheck.done() });
  }
}

module.exports = DeleteBikecheckHandler;
