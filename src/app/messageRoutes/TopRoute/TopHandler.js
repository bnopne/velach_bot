const Handler = require('../../../infrastructure/Handler');
const commands = require('../../../text/commands');
const { EVENT_TYPES } = require('../../../infrastructure/events/constants');
const UserExecutesCommand = require('../../../infrastructure/events/UserExecutesCommand');
const Bikecheck = require('../../../entities/Bikecheck');
const User = require('../../../entities/User');
const { getTopCaption } = require('../../../text/captions');
const settings = require('../../../settings');
const { getTopBikecheckKeyboard } = require('../../../text/keyboards');

class TopHandler extends Handler {
  async handle(message) {
    this.eventBus.emit(
      EVENT_TYPES.USER_EXECUTES_COMMAND,
      new UserExecutesCommand(commands.setstrava, message.from.id, message.chat.id),
    );

    const topLength = settings.get('bikechecks.topLength');
    const bikechecks = await Bikecheck.getTop(topLength);

    if (!bikechecks.length) {
      return;
    }

    const bikecheck = bikechecks[0];
    const bikecheckOwner = await User.findById(bikecheck.userId);

    const { likes, dislikes } = await bikecheck.getScore();

    await this.bot.sendPhoto(
      message.chat.id,
      bikecheck.telegramImageId,
      {
        reply_to_message_id: message.messageId,
        caption: getTopCaption(1, likes, dislikes, bikecheckOwner),
        reply_markup: getTopBikecheckKeyboard(1).export(),
        parse_mode: 'markdown',
      },
    );
  }
}

module.exports = TopHandler;
