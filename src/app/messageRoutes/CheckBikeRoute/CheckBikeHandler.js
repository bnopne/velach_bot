const Handler = require('../../../infrastructure/Handler');
const Bikecheck = require('../../../entities/Bikecheck');
const User = require('../../../entities/User');
const messages = require('../../../text/messages');
const commands = require('../../../text/commands');
const UserFailsToExecuteCommand = require('../../../infrastructure/events/UserFailsToExecuteCommand');

class CheckBikeHandler extends Handler {
  async handle(message) {
    const repliedMessage = message.replyToMessage;

    if (!repliedMessage) {
      await this.bot.sendMessage(
        message.chat.id,
        messages.checkBike.replyOnYourMessage(),
      );

      this.eventBus.emitUserFailsToExecuteCommand(new UserFailsToExecuteCommand(
        commands.checkbike,
        message.from.id,
        message.chat.id,
      ));

      return;
    }

    if (repliedMessage.from.id !== message.from.id) {
      await this.bot.sendMessage(
        message.chat.id,
        messages.checkBike.notYourMessage(),
      );

      this.eventBus.emitUserFailsToExecuteCommand(new UserFailsToExecuteCommand(
        commands.checkbike,
        message.from.id,
        message.chat.id,
      ));

      return;
    }

    if (!(repliedMessage.photo)) {
      await this.bot.sendMessage(
        message.chat.id,
        messages.checkBike.cantSeePhoto(),
      );

      this.eventBus.emitUserFailsToExecuteCommand(new UserFailsToExecuteCommand(
        commands.checkbike,
        message.from.id,
        message.chat.id,
      ));

      return;
    }

    const user = await User.findById(repliedMessage.from.id);
    const currentActiveBikecheck = await Bikecheck.findActiveForUser(user);

    if (currentActiveBikecheck) {
      await currentActiveBikecheck.setInactive();
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
