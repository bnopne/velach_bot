const Handler = require('../../../infrastructure/Handler');
const commands = require('../../../text/commands');
const { EVENT_TYPES } = require('../../../infrastructure/events/constants');
const UserExecutesCommand = require('../../../infrastructure/events/UserExecutesCommand');
const Bikecheck = require('../../../entities/Bikecheck');
const User = require('../../../entities/User');
const { getTopSellingCaption } = require('../../../text/captions');
const settings = require('../../../settings');
const { getTopBikecheckKeyboard } = require('../../../text/keyboards');
const messages = require('../../../text/messages');

class TopSellingHandler extends Handler {
  async handle(message) {
    this.eventBus.emit(
      EVENT_TYPES.USER_EXECUTES_COMMAND,
      new UserExecutesCommand(commands.top, message.from.id, message.chat.id),
    );

    const topLength = settings.get('bikechecks.topLength');
    const bikechecks = await Bikecheck.getTop(topLength, true);

    if (!bikechecks.length) {
      await this.bot.sendMessage(
        message.chat.id,
        messages.topSelling.noBikesForSale(),
        {
          reply_to_message_id: message.messageId,
        },
      );

      return;
    }

    const bikecheck = bikechecks[0];
    const bikecheckOwner = await User.findById(bikecheck.userId);

    await this.bot.sendPhoto(
      message.chat.id,
      bikecheck.telegramImageId,
      {
        reply_to_message_id: message.messageId,
        caption: getTopSellingCaption(1, bikecheckOwner),
        reply_markup: getTopBikecheckKeyboard(1).export(),
        parse_mode: 'markdown',
      },
    );
  }
}

module.exports = TopSellingHandler;
