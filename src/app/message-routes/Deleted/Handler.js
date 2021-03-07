const Handler = require('../../../infrastructure/Handler');
const User = require('../../../entities/User');
const Bikecheck = require('../../../entities/Bikecheck');
const Chat = require('../../../entities/Chat');
const messages = require('../../../text/messages');
const { sendDeletedBikecheckMessage } = require('../../common/bikecheck-utils');

class DeletedHandler extends Handler {
  async handle(message) {
    const bikecheckOwner = message.replyToMessage
      ? await User.findById(message.replyToMessage.from.id)
      : await User.findById(message.from.id);

    const chat = await Chat.findById(message.chat.id);

    const userBikechecks = await Bikecheck.findDeletedForUser(bikecheckOwner);

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

    await sendDeletedBikecheckMessage({
      bot: this.bot,
      chat,
      bikecheck: firstBikecheck,
      bikecheckOwner,
      message,
      userBikechecks,
    });
  }
}

module.exports = DeletedHandler;
