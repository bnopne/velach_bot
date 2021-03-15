const Handler = require('../../../infrastructure/Handler');
const Chat = require('../../../entities/Chat');

class AnnounceHandler extends Handler {
  async handle(message) {
    if (!message.replyToMessage) {
      await this.bot.sendMessage(message.chat.id, 'Ответь на сообщение с анонсом');
      return;
    }

    const announceMessage = message.replyToMessage;

    if (announceMessage.from.id !== message.from.id) {
      await this.bot.sendMessage(message.chat.id, 'Ответь на свое сообщение с анонсом');
      return;
    }

    const chats = await Chat.findAllPublic();

    chats.forEach((chat, i) => setTimeout(async () => {
      try {
        if (announceMessage.biggestPhoto) {
          await this.bot.sendPhoto(
            chat.id,
            announceMessage.biggestPhoto.fileId,
            {
              caption: announceMessage.caption,
            },
          );
        } else {
          await this.bot.sendMessage(
            chats[i].id,
            announceMessage.text,
          );
        }
        console.log(`Отправил анонс в чат ${chat.id}`);
      } catch (err) {
        console.error(`Ошибка отправки анонса в чат ${chat.id}`);
      }
    }, i * 2 * 1000));
  }
}

module.exports = AnnounceHandler;
