const Handler = require('../../../../infrastructure/Handler');
const User = require('../../../../entities/User');
const Chat = require('../../../../entities/Chat');
const Bikecheck = require('../../../../entities/Bikecheck');


class BanBikecheckHandler extends Handler {
  async handle(message) {
    const repliedMessage = message.replyToMessage;

    if (!repliedMessage) {
      await this.bot.sendMessage(
        message.chat.id,
        'Ответь кому-нибудь!',
      );

      return;
    }

    if (repliedMessage.from.id === message.from.id) {
      await this.bot.sendMessage(
        message.chat.id,
        'Ты не мог забанить свой байк, значит не можешь и разбанить!',
      );

      return;
    }

    const user = await User.findById(repliedMessage.from.id);
    const bikecheck = await Bikecheck.findActiveForUser(user);

    if (!bikecheck) {
      await this.bot.sendMessage(
        message.chat.id,
        'Похоже, что у этого товарища нет велосипеда!',
      );

      return;
    }

    const chat = await Chat.findById(message.chat.id);
    await bikecheck.unbanInChat(chat);

    await this.bot.sendMessage(
      message.chat.id,
      'Разбанил!',
    );
  }
}


module.exports = BanBikecheckHandler;
