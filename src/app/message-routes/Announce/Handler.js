const Handler = require('../../../infrastructure/Handler');
const Chat = require('../../../entities/Chat');

const wait = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

class AnnounceHandler extends Handler {
  async handle(message) {
    if (!message.replyToMessage) {
      await this.bot.sendMessage(message.chat.id, 'Ответь на сообщение с анонсом');
      return;
    }

    if (message.replyToMessage.from.id !== message.from.id) {
      await this.bot.sendMessage(message.chat.id, 'Ответь на свое сообщение с анонсом');
      return;
    }

    const chats = await Chat.findAllPublic();

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < chats.length; i++) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await this.bot.sendMessage(
          chats[i].id,
          message.replyToMessage.text,
          {
            parse_mode: 'markdown',
          },
        );
      } catch (err) {
        console.error(`Ошибка отправки анонса в чат ${chats[i].id}`);
      }

      // eslint-disable-next-line no-await-in-loop
      await wait(2 * 1000);
    }
  }
}

module.exports = AnnounceHandler;
