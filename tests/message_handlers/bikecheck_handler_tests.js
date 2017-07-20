const assert = require('chai').assert;
const TransactionScopeTest = require('../transaction_scope_test');
const Db = require('../../db');
const messageHandlers = require('../../message_handlers');
const TelegramMessage = require('../../telegram_entities').TelegramMessage;

class BotMock {

  constructor() {
    this.sendMessageCallCount = 0;
    this.sendMessageArguments = {
      chatId: null,
      text: null
    };

    this.getMeCallCount = 0;
  };

  async sendMessage(chatId, text) {
    this.sendMessageCallCount += 1;
    this.sendMessageArguments.chatId = chatId;
    this.sendMessageArguments.text = text;
  };

  async getMe() {
    this.getMeCallCount += 1;

    return {
      id: 123,
      username: 'test'
    };
  };

};

exports.test1 = new TransactionScopeTest(
  'test handle',
  async function(client) {

    const message = new TelegramMessage({
      message_id: 498,
      from:
      { id: 128540035,
        first_name: 'Вася',
        last_name: 'Цветомузыка',
        username: 'vasya_cvetomuzika' },
      chat:
      { id: -153286219,
        title: 'VelachBotTest',
        type: 'group',
        all_members_are_administrators: true },
      date: 1500507577,
      reply_to_message:
      { message_id: 494,
        from:
          { id: 128540035,
            first_name: 'Вася',
            last_name: 'Цветомузыка',
            username: 'vasya_cvetomuzika' },
        chat:
          { id: -153286219,
            title: 'VelachBotTest',
            type: 'group',
            all_members_are_administrators: true },
        date: 1500503495,
        text: '/kek@velach_test_bot',
        entities: [ [Object] ] },
      text: '/bikecheck',
      entities: [ { type: 'bot_command', offset: 0, length: 10 } ]
    });

    const db = new Db(client);
    const bot = new BotMock();

    const handler = new messageHandlers.commandHandlers.BikecheckHandler(message, bot, db);

    await handler.handle();

    assert.equal(bot.sendMessageCallCount, 1);
    assert.equal(bot.sendMessageArguments.chatId, -153286219);
    assert.equal(bot.sendMessageArguments.text, 'Этот почтенный велан показал свою повозку, кек!');
  }
);
