const Handler = require('../../../infrastructure/Handler');
const User = require('../../../entities/User');
const messages = require('../../../text/messages');
const commands = require('../../../text/commands');
const UserFailsToExecuteCommand = require('../../../infrastructure/events/UserFailsToExecuteCommand');
const { EVENT_TYPES } = require('../../../infrastructure/events/constants');
const UserExecutesCommand = require('../../../infrastructure/events/UserExecutesCommand');

const STRAVA_LINK_REGEXP = /^(https:\/\/)?(www.)?strava.com\/athletes\/\d+$/;

class SetStravaHandler extends Handler {
  async handle(message) {
    this.eventBus.emit(
      EVENT_TYPES.USER_EXECUTES_COMMAND,
      new UserExecutesCommand(commands.setstrava, message.from.id, message.chat.id),
    );

    const user = await User.findById(message.from.id);

    if (!message.replyToMessage) {
      await this.bot.sendMessage(
        message.chat.id,
        messages.setStrava.replyOnMessageWithLink(),
        { reply_to_message_id: message.messageId },
      );

      this.eventBus.emit(
        EVENT_TYPES.USER_FAILS_TO_EXECUTE_COMMAND,
        new UserFailsToExecuteCommand(
          commands.setstrava,
          message.from.id,
          message.chat.id,
        ),
      );

      return;
    }

    if (!message.replyToMessage.text) {
      await this.bot.sendMessage(
        message.chat.id,
        messages.setStrava.noLinks(),
        { reply_to_message_id: message.messageId },
      );

      this.eventBus.emit(
        EVENT_TYPES.USER_FAILS_TO_EXECUTE_COMMAND,
        new UserFailsToExecuteCommand(
          commands.setstrava,
          message.from.id,
          message.chat.id,
        ),
      );

      return;
    }

    if (!STRAVA_LINK_REGEXP.test(message.replyToMessage.text)) {
      await this.bot.sendMessage(
        message.chat.id,
        messages.setStrava.cantFindLink(),
        { reply_to_message_id: message.messageId },
      );

      this.eventBus.emit(
        EVENT_TYPES.USER_FAILS_TO_EXECUTE_COMMAND,
        new UserFailsToExecuteCommand(
          commands.setstrava,
          message.from.id,
          message.chat.id,
        ),
      );

      return;
    }

    let link = message.replyToMessage.text;

    if (!link.startsWith('https://')) {
      link = `https://${link}`;
    }

    await user.setStravaLink(link);

    await this.bot.sendMessage(
      message.chat.id,
      messages.setStrava.done(),
      { reply_to_message_id: message.messageId },
    );
  }
}

module.exports = SetStravaHandler;
