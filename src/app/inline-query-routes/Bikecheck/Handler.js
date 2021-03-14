const Handler = require('../../../infrastructure/Handler');
const User = require('../../../entities/User');
const Bikecheck = require('../../../entities/Bikecheck');
const { getBikecheckCaption } = require('../../../text/captions');
const { getPublicBikecheckKeyboard } = require('../../../text/keyboards');

class BikecheckHandler extends Handler {
  async handle(inlineQuery) {
    const user = await User.findById(inlineQuery.from.id);
    const bikechecks = await Bikecheck.findActiveForUser(user);

    if (!bikechecks.length) {
      await this.bot.answerInlineQuery(inlineQuery.id, []);
      return;
    }

    const inlineQueryAnswer = await Promise.all(bikechecks.map(async (bikecheck, i) => {
      const { likes, dislikes } = await bikecheck.getScore();
      const rank = await bikecheck.getRank();

      return {
        id: bikecheck.id,
        type: 'photo',
        photo_file_id: bikecheck.telegramImageId,
        caption: getBikecheckCaption(
          likes,
          dislikes,
          user.stravaLink,
          i,
          bikechecks.length,
          rank,
          bikecheck.onSale,
        ),
        parse_mode: 'markdown',
        reply_markup: getPublicBikecheckKeyboard(bikecheck).export(),
      };
    }));

    await this.bot.answerInlineQuery(
      inlineQuery.id,
      inlineQueryAnswer,
      {
        cache_time: 5,
      },
    );
  }
}

module.exports = BikecheckHandler;
