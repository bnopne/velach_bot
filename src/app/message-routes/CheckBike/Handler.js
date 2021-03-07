const Handler = require('../../../infrastructure/Handler');
const Bikecheck = require('../../../entities/Bikecheck');
const User = require('../../../entities/User');
const messages = require('../../../text/messages');
const settings = require('../../../settings');

class CheckBikeHandler extends Handler {
  async handle(message) {
    const repliedMessage = message.replyToMessage;

    if (!repliedMessage) {
      await this.bot.sendMessage(
        message.chat.id,
        messages.checkBike.replyOnYourMessage(),
      );

      return;
    }

    if (repliedMessage.from.id !== message.from.id) {
      await this.bot.sendMessage(
        message.chat.id,
        messages.checkBike.notYourMessage(),
      );

      return;
    }

    if (!(repliedMessage.photo)) {
      await this.bot.sendMessage(
        message.chat.id,
        messages.checkBike.cantSeePhoto(),
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
