const Handler = require('../../../../infrastructure/Handler');
const Bikecheck = require('../../../../entities/Bikecheck');
const User = require('../../../../entities/User');


class CheckBikeHandler extends Handler {
  async handle(message) {
    const repliedMessage = message.replyToMessage;

    if (!repliedMessage) {
      await this.bot.sendMessage(
        message.chat.id,
        'Ответь на свое сообщение, в котором есть картинка с велосипедом!',
      );

      return;
    }

    if (repliedMessage.from.id !== message.from.id) {
      await this.bot.sendMessage(
        message.chat.id,
        'Это не твое сообщение, запости картинку сам!',
      );

      return;
    }

    if (!(repliedMessage.photo)) {
      await this.bot.sendMessage(
        message.chat.id,
        'Не вижу фотокарточки с велосипедом!',
      );

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
      'Чекнул, кекнул!',
      { reply_to_message_id: message.messageId },
    );
  }
}


module.exports = CheckBikeHandler;
