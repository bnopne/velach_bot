const Handler = require('../../../infrastructure/Handler');
const User = require('../../../entities/User');
const Bikecheck = require('../../../entities/Bikecheck');
const Chat = require('../../../entities/Chat');
const { getBikecheckCaption } = require('../../../text/captions');
const { getBikecheckKeyboard } = require('../../../text/keyboards');
const messages = require('../../../text/messages');
const UserExecutesCommand = require('../../../infrastructure/events/UserExecutesCommand');
const { EVENT_TYPES } = require('../../../infrastructure/events/constants');
const commands = require('../../../text/commands');

class BikecheckHandler extends Handler {
  async handle(message) {
    this.eventBus.emit(
      EVENT_TYPES.USER_EXECUTES_COMMAND,
      new UserExecutesCommand(commands.bikecheck, message.from.id, message.chat.id),
    );

    const user = message.replyToMessage
      ? await User.findById(message.replyToMessage.from.id)
      : await User.findById(message.from.id);

    const chat = await Chat.findById(message.chat.id);

    const bikechecks = await Bikecheck.findActiveForChat(user, chat);

    if (!bikechecks.length) {
      await this.bot.sendMessage(
        message.chat.id,
        messages.bikecheck.doesntHaveBike(),
        {
          reply_to_message_id: message.messageId,
        },
      );

      return;
    }
    const firstBikecheck = bikechecks[0];
    const { likes, dislikes } = await firstBikecheck.getScore();
    const rank = await firstBikecheck.getRank();

    await this.bot.sendPhoto(
      message.chat.id,
      firstBikecheck.telegramImageId,
      {
        reply_to_message_id: message.messageId,
        caption: getBikecheckCaption(likes, dislikes, user.stravaLink, 0, bikechecks.length, rank),
        reply_markup: getBikecheckKeyboard(firstBikecheck, chat).export(),
        parse_mode: 'markdown',
      },
    );
  }
}

module.exports = BikecheckHandler;
