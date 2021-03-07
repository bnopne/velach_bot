const Handler = require('../../../infrastructure/Handler');
const User = require('../../../entities/User');
const Bikecheck = require('../../../entities/Bikecheck');
const Chat = require('../../../entities/Chat');
const messages = require('../../../text/messages');
const { sendBikecheckMessage } = require('../../common/bikecheck-utils');

class BikecheckHandler extends Handler {
  async handle(message) {
    const user = message.replyToMessage
      ? await User.findById(message.replyToMessage.from.id)
      : await User.findById(message.from.id);

    const chat = await Chat.findById(message.chat.id);

    const userBikechecks = await Bikecheck.findActiveForChat(user, chat);

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
      chat,
      bikecheck: firstBikecheck,
      bikecheckOwner: user,
      userBikechecks,
    });
  }
}

module.exports = BikecheckHandler;
