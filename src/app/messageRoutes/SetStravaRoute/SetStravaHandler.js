const Handler = require('../../../infrastructure/Handler');
const User = require('../../../entities/User');
const messages = require('../../../text/messages');
const commands = require('../../../text/commands');
const UserFailsToExecuteCommand = require('../../../infrastructure/events/UserFailsToExecuteCommand');

const STRAVA_LINK_REGEXP = /^(https:\/\/)?(www.)?strava.com\/athletes\/\d+$/;

class CheckBikeHandler extends Handler {
  async handle(message) {
    const user = await User.findById(message.from.id);

    if (!message.replyToMessage) {
      await this.bot.sendMessage(
        message.chat.id,
        messages.setStrava.replyOnMessageWithLink(),
        { reply_to_message_id: message.messageId },
      );

      this.eventBus.emitUserFailsToExecuteCommand(new UserFailsToExecuteCommand(
        commands.checkbike,
        message.from.id,
        message.chat.id,
      ));

      return;
    }

    if (!message.replyToMessage.text) {
      await this.bot.sendMessage(
        message.chat.id,
        messages.setStrava.noLinks(),
        { reply_to_message_id: message.messageId },
      );

      this.eventBus.emitUserFailsToExecuteCommand(new UserFailsToExecuteCommand(
        commands.checkbike,
        message.from.id,
        message.chat.id,
      ));

      return;
    }

    if (!STRAVA_LINK_REGEXP.test(message.replyToMessage.text)) {
      await this.bot.sendMessage(
        message.chat.id,
        messages.setStrava.cantFindLink(),
        { reply_to_message_id: message.messageId },
      );

      this.eventBus.emitUserFailsToExecuteCommand(new UserFailsToExecuteCommand(
        commands.checkbike,
        message.from.id,
        message.chat.id,
      ));

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

module.exports = CheckBikeHandler;