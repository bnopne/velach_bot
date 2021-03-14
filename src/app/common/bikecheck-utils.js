const settings = require('../../settings');
const { getBikecheckCaption, getTopSellingCaption } = require('../../text/captions');
const {
  getBikecheckKeyboard,
  getPublicBikecheckKeyboard,
  getDeletedBikecheckKeyboard,
  getOnSaleBikecheckKeyboard,
  getAdminOnSaleBikecheckKeyboard,
} = require('../../text/keyboards');
const Chat = require('../../entities/Chat');

async function sendBikecheckMessage({
  bot,
  message,
  bikecheck,
  bikecheckOwner,
  userBikechecks,
}) {
  const chat = await Chat.findById(message.chat.id);
  const { likes, dislikes } = await bikecheck.getScore();
  const rank = await bikecheck.getRank();

  return bot.sendPhoto(
    message.chat.id,
    bikecheck.telegramImageId,
    {
      reply_to_message_id: message.messageId,
      caption: getBikecheckCaption(
        likes,
        dislikes,
        bikecheckOwner.stravaLink,
        0,
        userBikechecks.length,
        rank,
        bikecheck.onSale,
      ),
      reply_markup: getBikecheckKeyboard(bikecheck, chat).export(),
      parse_mode: 'markdown',
    },
  );
}

async function editBikecheckMessage({
  bot,
  callbackQuery,
  bikecheck,
  bikecheckOwner,
  userBikechecks,
}) {
  const isInlineMode = Boolean(callbackQuery.inlineMessageId);

  const bikecheckIndex = userBikechecks.findIndex((b) => b.id === bikecheck.id);

  const chat = callbackQuery.inlineMessageId
    ? null
    : await Chat.findById(callbackQuery.message.chat.id);

  const { likes, dislikes } = await bikecheck.getScore();
  const rank = await bikecheck.getRank();

  const target = isInlineMode
    ? { inline_message_id: callbackQuery.inlineMessageId }
    : {
      chat_id: callbackQuery.message.chat.id,
      message_id: callbackQuery.message.messageId,
    };

  return bot.editMessageMedia(
    {
      type: 'photo',
      media: bikecheck.telegramImageId,
      caption: getBikecheckCaption(
        likes,
        dislikes,
        bikecheckOwner.stravaLink,
        bikecheckIndex,
        userBikechecks.length,
        rank,
        bikecheck.onSale,
      ),
      parse_mode: 'markdown',
    },
    {
      ...target,
      reply_markup: isInlineMode
        ? getPublicBikecheckKeyboard(bikecheck).export()
        : getBikecheckKeyboard(bikecheck, chat).export(),
    },
  );
}

async function sendDeletedBikecheckMessage({
  bot,
  message,
  bikecheck,
  bikecheckOwner,
  userBikechecks,
}) {
  const { likes, dislikes } = await bikecheck.getScore();

  return bot.sendPhoto(
    message.chat.id,
    bikecheck.telegramImageId,
    {
      reply_to_message_id: message.messageId,
      caption: getBikecheckCaption(
        likes,
        dislikes,
        bikecheckOwner.stravaLink,
        0,
        userBikechecks.length,
        -1,
        bikecheck.onSale,
      ),
      reply_markup: getDeletedBikecheckKeyboard(bikecheck).export(),
      parse_mode: 'markdown',
    },
  );
}

async function editDeletedBikecheckMessage({
  bot,
  callbackQuery,
  bikecheck,
  bikecheckOwner,
  userBikechecks,
}) {
  const { likes, dislikes } = await bikecheck.getScore();
  const bikecheckIndex = userBikechecks.findIndex((b) => b.id === bikecheck.id);

  return bot.editMessageMedia(
    {
      type: 'photo',
      media: bikecheck.telegramImageId,
      caption: getBikecheckCaption(
        likes,
        dislikes,
        bikecheckOwner.stravaLink,
        bikecheckIndex,
        userBikechecks.length,
        -1,
        bikecheck.onSale,
      ),
      parse_mode: 'markdown',
    },
    {
      chat_id: callbackQuery.message.chat.id,
      message_id: callbackQuery.message.messageId,
      reply_markup: getDeletedBikecheckKeyboard(bikecheck).export(),
    },
  );
}

async function editOnSaleBikecheckMessage({
  bot,
  callbackQuery,
  bikecheck,
  bikecheckOwner,
  position,
}) {
  const chat = await Chat.findById(callbackQuery.message.chat.id);

  const keyboard = chat.type === 'private' && callbackQuery.from.username === settings.get('auth.ownerUsername')
    ? getAdminOnSaleBikecheckKeyboard(position, bikecheck)
    : getOnSaleBikecheckKeyboard(position);

  await bot.editMessageMedia(
    {
      type: 'photo',
      media: bikecheck.telegramImageId,
      caption: getTopSellingCaption(position, bikecheckOwner),
      parse_mode: 'markdown',
    },
    {
      chat_id: callbackQuery.message.chat.id,
      message_id: callbackQuery.message.messageId,
      reply_markup: keyboard.export(),
    },
  );
}

module.exports = {
  sendBikecheckMessage,
  editBikecheckMessage,
  sendDeletedBikecheckMessage,
  editDeletedBikecheckMessage,
  editOnSaleBikecheckMessage,
};
