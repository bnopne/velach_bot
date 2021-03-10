const settings = require('../../settings');
const { getBikecheckCaption, getTopSellingCaption } = require('../../text/captions');
const {
  getBikecheckKeyboard,
  getDeletedBikecheckKeyboard,
  getOnSaleBikecheckKeyboard,
  getAdminOnSaleBikecheckKeyboard,
} = require('../../text/keyboards');

async function sendBikecheckMessage({
  bot,
  message,
  chat,
  bikecheck,
  bikecheckOwner,
  userBikechecks,
}) {
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
  chat,
  bikecheck,
  bikecheckIndex,
  bikecheckOwner,
  userBikechecks,
}) {
  const { likes, dislikes } = await bikecheck.getScore();
  const rank = await bikecheck.getRank();

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
      chat_id: callbackQuery.message.chat.id,
      message_id: callbackQuery.message.messageId,
      reply_markup: getBikecheckKeyboard(bikecheck, chat).export(),
    },
  );
}

async function sendDeletedBikecheckMessage({
  bot,
  message,
  chat,
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
      reply_markup: getDeletedBikecheckKeyboard(bikecheck, chat).export(),
      parse_mode: 'markdown',
    },
  );
}

async function editDeletedBikecheckMessage({
  bot,
  callbackQuery,
  bikecheck,
  bikecheckOwner,
  bikecheckIndex,
  userBikechecks,
}) {
  const { likes, dislikes } = await bikecheck.getScore();

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

function editOnSaleBikecheckMessage({
  bot,
  callbackQuery,
  chat,
  bikecheck,
  bikecheckOwner,
  position,
}) {
  const keyboard = chat.type === 'private' && callbackQuery.from.username === settings.get('auth.ownerUsername')
    ? getAdminOnSaleBikecheckKeyboard(position, bikecheck)
    : getOnSaleBikecheckKeyboard(position);

  return bot.editMessageMedia(
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
