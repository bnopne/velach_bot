const assert = require('chai').assert;
const TransactionScopeTest = require('../transaction_scope_test');
const Db = require('../../db');
const messageHandlers = require('../../message_handlers');

class BotMock {

  constructor() {
    this.sendMessageCallCount = 0;
    this.getMeCallCount = 0;
  };

  async sendMessage(chatId, text) {
    this.sendMessageCallCount += 1;
  };

  async getMe() {
    this.getMeCallCount += 1;

    return {
      id: 123,
      username: 'test'
    };
  };

  async getChatAdministrators() {
    return [
      {
        user: {
          id: 128540035
        }
      }
    ];
  };

};

exports.testSetGreetingMessage = new TransactionScopeTest(
  'test set greeting message',
  async function(client) {

    const message = {
      message_id: 380,
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
      date: 1500128213,
      text: '/set_greeting kek puk'
    };

    const db = new Db(client);
    const bot = new BotMock();

    const handler = new messageHandlers.SetGreetingMessageHandler(message, bot, db);

    await handler.handle();

    const qr = await client.query('SELECT * FROM tg_chat WHERE id = $1', [-153286219]);

    assert.equal(qr.rows[0].greeting_message, 'kek puk');

  }
);
