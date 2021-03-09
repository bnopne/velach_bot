/* eslint-disable import/prefer-default-export */
const InlineKeyboardMarkup = require('../infrastructure/dto/InlineKeyboardMarkup');
const InlineKeyboardButton = require('../infrastructure/dto/InlineKeyboardButton');
const CallbackData = require('../infrastructure/dto/CallbackData');
const settings = require('../settings');

const getBikecheckKeyboard = (bikecheck, chat) => {
  if (chat.type === 'private') {
    return InlineKeyboardMarkup.createFromButtonRows([
      [
        InlineKeyboardButton.createWithCallbackData('⬅', CallbackData.createShowPreviousBikecheck(bikecheck)),
        InlineKeyboardButton.createWithCallbackData('➡', CallbackData.createShowNextBikecheck(bikecheck)),
      ],
      [
        InlineKeyboardButton.createWithCallbackData('Удалить', CallbackData.createDeleteBikecheck(bikecheck)),
        InlineKeyboardButton.createWithCallbackData(
          bikecheck.onSale ? 'Снять с продажи' : 'Выставить на продажу',
          CallbackData.createToggleOnSale(bikecheck),
        ),
      ],
    ]);
  }

  return InlineKeyboardMarkup.createFromButtonRows([
    [
      InlineKeyboardButton.createWithCallbackData('⬅', CallbackData.createShowPreviousBikecheck(bikecheck)),
      InlineKeyboardButton.createWithCallbackData('👍', CallbackData.createLikeForBikecheck(bikecheck)),
      InlineKeyboardButton.createWithCallbackData('👎', CallbackData.createDislikeForBikecheck(bikecheck)),
      InlineKeyboardButton.createWithCallbackData('➡', CallbackData.createShowNextBikecheck(bikecheck)),
    ],
  ]);
};

const getDeletedBikecheckKeyboard = (bikecheck) => InlineKeyboardMarkup.createFromButtonRows([
  [
    InlineKeyboardButton.createWithCallbackData('⬅', CallbackData.createShowPreviousDeletedBikecheck(bikecheck)),
    InlineKeyboardButton.createWithCallbackData('➡', CallbackData.createShowNextDeletedBikecheck(bikecheck)),
  ],
  [
    InlineKeyboardButton.createWithCallbackData('Восстановить', CallbackData.createRestoreBikecheck(bikecheck)),
  ],
]);

const getTopBikecheckKeyboard = (position) => InlineKeyboardMarkup.createFromButtonRows([
  (new Array(settings.get('bikechecks.topLength')))
    .fill()
    .map((_, i) => InlineKeyboardButton.createWithCallbackData(
      `${i + 1}`,
      CallbackData.createShowTopBikecheck(i + 1 === position ? 0 : i + 1),
    )),
]);

const getTopSellingBikecheckKeyboard = (position) => InlineKeyboardMarkup.createFromButtonRows([
  (new Array(settings.get('bikechecks.topLength')))
    .fill()
    .map((_, i) => InlineKeyboardButton.createWithCallbackData(
      `${i + 1}`,
      CallbackData.createShowTopSellingBikecheck(i + 1 === position ? 0 : i + 1),
    )),
]);

const getOnSaleBikecheckKeyboard = (currentPosition, bikecheck, chat) => {
  if (chat.type === 'private') {
    return InlineKeyboardMarkup.createFromButtonRows([
      [
        InlineKeyboardButton.createWithCallbackData('⬅', CallbackData.createShowPreviousOnSaleBikecheck(currentPosition)),
        InlineKeyboardButton.createWithCallbackData('➡', CallbackData.createShowNextOnSaleBikecheck(currentPosition)),
      ],
      [
        InlineKeyboardButton.createWithCallbackData('Bump', CallbackData.createForBumpBikecheck(bikecheck)),
        InlineKeyboardButton.createWithCallbackData('Sage', CallbackData.createForSageBikecheck(bikecheck)),
      ],
    ]);
  }

  return InlineKeyboardMarkup.createFromButtonRows([
    [
      InlineKeyboardButton.createWithCallbackData('⬅', CallbackData.createShowPreviousOnSaleBikecheck(currentPosition)),
      InlineKeyboardButton.createWithCallbackData('➡', CallbackData.createShowNextOnSaleBikecheck(currentPosition)),
    ],
  ]);
};

module.exports = {
  getBikecheckKeyboard,
  getDeletedBikecheckKeyboard,
  getTopBikecheckKeyboard,
  getTopSellingBikecheckKeyboard,
  getOnSaleBikecheckKeyboard,
};
