const Service = require('../infrastructure/Service');
const InlineKeyboardMarkup = require('../infrastructure/dto/InlineKeyboardMarkup');
const InlineKeyboardButton = require('../infrastructure/dto/InlineKeyboardButton');
const CallbackData = require('../infrastructure/dto/CallbackData');


class BikecheckService extends Service {
  getKeyboard(bikecheck) { // eslint-disable-line
    return InlineKeyboardMarkup.createFromButtons([
      InlineKeyboardButton.createWithCallbackData('👍', CallbackData.createLikeForBikecheck(bikecheck)),
      InlineKeyboardButton.createWithCallbackData('👎', CallbackData.createDislikeForBikecheck(bikecheck)),
    ]);
  }

  async getCaption(bikecheck) { // eslint-disable-line
    const score = await bikecheck.getScore();
    return `Голосов за: ${score.likeCount}\nГолосов против: ${score.dislikeCount}`;
  }
}


module.exports = BikecheckService;
