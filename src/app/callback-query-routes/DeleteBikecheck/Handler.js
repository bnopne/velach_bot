const Handler = require('../../../infrastructure/Handler');
const Bikecheck = require('../../../entities/Bikecheck');
const User = require('../../../entities/User');
const Chat = require('../../../entities/Chat');
const { getBikecheckKeyboard } = require('../../../text/keyboards');
const { getBikecheckCaption } = require('../../../text/captions');
const messages = require('../../../text/messages');

class DeleteBikecheckHandler extends Handler {
  async handle(callbackQuery) {
    const user = await User.findById(callbackQuery.from.id);
    const chat = await Chat.findById(callbackQuery.message.chat.id);
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

    const bikechecks = await Bikecheck.findActiveForChat(user, chat);

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

    const { likes, dislikes } = await nextBikecheck.getScore();
    const rank = await nextBikecheck.getRank();

    await this.bot.editMessageMedia(
      {
        type: 'photo',
        media: nextBikecheck.telegramImageId,
        caption: getBikecheckCaption(
          likes,
          dislikes,
          bikecheckOwner.stravaLink,
          0,
          bikechecks.length,
          rank,
          nextBikecheck.onSale,
        ),
        parse_mode: 'markdown',
      },
      {
        chat_id: callbackQuery.message.chat.id,
        message_id: callbackQuery.message.messageId,
        reply_markup: getBikecheckKeyboard(nextBikecheck, chat).export(),
      },
    );

    await this.bot.answerCallbackQuery(callbackQuery.id, { text: messages.deleteBikecheck.done() });
  }
}

module.exports = DeleteBikecheckHandler;
