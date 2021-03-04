const Handler = require('../../../infrastructure/Handler');
const Bikecheck = require('../../../entities/Bikecheck');
const User = require('../../../entities/User');
const messages = require('../../../text/messages');
const commands = require('../../../text/commands');
const UserFailsToExecuteCommand = require('../../../infrastructure/events/UserFailsToExecuteCommand');
const UserExecutesCommand = require('../../../infrastructure/events/UserExecutesCommand');
const { EVENT_TYPES } = require('../../../infrastructure/events/constants');
const settings = require('../../../settings');

class CheckBikeHandler extends Handler {
  async handle(message) {
    this.eventBus.emit(
      EVENT_TYPES.USER_EXECUTES_COMMAND,
      new UserExecutesCommand(commands.checkbike, message.from.id, message.chat.id),
    );

    const repliedMessage = message.replyToMessage;

    if (!repliedMessage) {
      await this.bot.sendMessage(
        message.chat.id,
        messages.checkBike.replyOnYourMessage(),
      );

      this.eventBus.emit(
        EVENT_TYPES.USER_FAILS_TO_EXECUTE_COMMAND,
        new UserFailsToExecuteCommand(commands.checkbike, message.from.id, message.chat.id),
      );

      return;
    }

    if (repliedMessage.from.id !== message.from.id) {
      await this.bot.sendMessage(
        message.chat.id,
        messages.checkBike.notYourMessage(),
      );

      this.eventBus.emit(
        EVENT_TYPES.USER_FAILS_TO_EXECUTE_COMMAND,
        new UserFailsToExecuteCommand(commands.checkbike, message.from.id, message.chat.id),
      );

      return;
    }

    if (!(repliedMessage.photo)) {
      await this.bot.sendMessage(
        message.chat.id,
        messages.checkBike.cantSeePhoto(),
      );

      this.eventBus.emit(
        EVENT_TYPES.USER_FAILS_TO_EXECUTE_COMMAND,
        new UserFailsToExecuteCommand(commands.checkbike, message.from.id, message.chat.id),
      );

      return;
    }

    const user = await User.findById(repliedMessage.from.id);

    const currentBikechecks = await Bikecheck.findActiveForUser(user);

    if (currentBikechecks.length >= settings.get('bikechecks.maxBikechecksPerUser')) {
      await this.bot.sendMessage(
        message.chat.id,
        messages.bikecheck.tooManyBikechecks(),
        { reply_to_message_id: message.messageId },
      );

      return;
    }

    await Bikecheck.createActiveForUser(
      user,
      repliedMessage.biggestPhoto.fileId,
    );

    await this.bot.sendMessage(
      message.chat.id,
      messages.checkBike.done(),
      { reply_to_message_id: message.messageId },
    );
  }
}

module.exports = CheckBikeHandler;
