const Handler = require('../../../infrastructure/Handler');
const User = require('../../../entities/User');
const Bikecheck = require('../../../entities/Bikecheck');
const messages = require('../../../text/messages');
const { sendBikecheckMessage } = require('../../common/bikecheck-utils');

class BikecheckHandler extends Handler {
  async handle(message) {
    const user = message.replyToMessage
      ? await User.findById(message.replyToMessage.from.id)
      : await User.findById(message.from.id);

    const userBikechecks = await Bikecheck.findActiveForUser(user);

    if (!userBikechecks.length) {
      await this.bot.sendMessage(
        message.chat.id,
        messages.bikecheck.doesntHaveBike(),
        {
          reply_to_message_id: message.messageId,
        },
      );

      return;
    }

    const firstBikecheck = userBikechecks[0];

    await sendBikecheckMessage({
      bot: this.bot,
      message,
      bikecheck: firstBikecheck,
      bikecheckOwner: user,
      userBikechecks,
    });
  }
}

module.exports = BikecheckHandler;
