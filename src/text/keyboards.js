/* eslint-disable import/prefer-default-export */
const InlineKeyboardMarkup = require('../infrastructure/dto/InlineKeyboardMarkup');
const InlineKeyboardButton = require('../infrastructure/dto/InlineKeyboardButton');
const CallbackData = require('../infrastructure/dto/CallbackData');

const getBikecheckKeyboard = (bikecheck) => InlineKeyboardMarkup.createFromButtonRows([
  [
    InlineKeyboardButton.createWithCallbackData('⬅', CallbackData.createShowPreviousBikecheck(bikecheck)),
    InlineKeyboardButton.createWithCallbackData('👍', CallbackData.createLikeForBikecheck(bikecheck)),
    InlineKeyboardButton.createWithCallbackData('👎', CallbackData.createDislikeForBikecheck(bikecheck)),
    InlineKeyboardButton.createWithCallbackData('➡', CallbackData.createShowNextBikecheck(bikecheck)),
  ],
  [
    InlineKeyboardButton.createWithCallbackData('Удалить', CallbackData.createDeleteBikecheck(bikecheck)),
    InlineKeyboardButton.createWithCallbackData('Забанить', CallbackData.createBanBikecheck(bikecheck)),
  ],
]);

module.exports = {
  getBikecheckKeyboard,
};
