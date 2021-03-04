const Handler = require('../../../infrastructure/Handler');
const Bikecheck = require('../../../entities/Bikecheck');
const User = require('../../../entities/User');
const Chat = require('../../../entities/Chat');
const { getBikecheckKeyboard } = require('../../../text/keyboards');
const { getBikecheckCaption } = require('../../../text/captions');
const messages = require('../../../text/messages');
const UserSendsCallbackQuery = require('../../../infrastructure/events/UserSendsCallbackQuery');
const { EVENT_TYPES } = require('../../../infrastructure/events/constants');
const settings = require('../../../settings');

class BanBikecheckHandler extends Handler {
  async handle(callbackQuery) {
    this.eventBus.emit(
      EVENT_TYPES.USER_SENDS_CALLBACK_QUERY,
      new UserSendsCallbackQuery(callbackQuery.from.id),
    );

    const user = await User.findById(callbackQuery.from.id);
    const chat = await Chat.findById(callbackQuery.message.chat.id);
    const bikecheck = await Bikecheck.findById(callbackQuery.data.getField('bikecheckId'));
    const bikecheckOwner = await User.findById(bikecheck.userId);

    if (user.id === bikecheck.userId) {
      await this.bot.answerCallbackQuery(
        callbackQuery.id,
        { text: messages.banBikecheck.cantBanOwnBike() },
      );
      return;
    }

    await bikecheck.banInChat(chat);

    const bikechecks = await Bikecheck.findActiveForChat(bikecheckOwner, chat);

    if (!bikechecks.length) {
      await this.bot.editMessageMedia(
        {
          type: 'photo',
          media: settings.get(bikecheck.emptyBikecheckPictureUrl),
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
        ),
        parse_mode: 'markdown',
      },
      {
        chat_id: callbackQuery.message.chat.id,
        message_id: callbackQuery.message.messageId,
        reply_markup: getBikecheckKeyboard(nextBikecheck, chat).export(),
      },
    );

    await this.bot.answerCallbackQuery(callbackQuery.id, { text: messages.banBikecheck.done() });
  }
}

module.exports = BanBikecheckHandler;
