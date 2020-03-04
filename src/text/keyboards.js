/* eslint-disable import/prefer-default-export */
const InlineKeyboardMarkup = require('../infrastructure/dto/InlineKeyboardMarkup');
const InlineKeyboardButton = require('../infrastructure/dto/InlineKeyboardButton');
const CallbackData = require('../infrastructure/dto/CallbackData');

const getBikecheckKeyboard = bikecheck => InlineKeyboardMarkup.createFromButtons([
  InlineKeyboardButton.createWithCallbackData('👍', CallbackData.createLikeForBikecheck(bikecheck)),
  InlineKeyboardButton.createWithCallbackData('👎', CallbackData.createDislikeForBikecheck(bikecheck)),
]);

module.exports = {
  getBikecheckKeyboard,
};
