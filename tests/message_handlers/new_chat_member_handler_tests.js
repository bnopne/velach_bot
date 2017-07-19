const assert = require('chai').assert;
const TransactionScopeTest = require('../transaction_scope_test');
const Db = require('../../db');
const messageHandlers = require('../../message_handlers');
const TelegramMessage = require('../../telegram_entities').TelegramMessage;

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

};

exports.testHandleNewChatMemberWhenAddAnotherUser = new TransactionScopeTest(
  'test add non-bot user',
  async function(client) {

    const message = new TelegramMessage({
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
      new_chat_participant: {
        id: 322950358,
        first_name: 'Denis'
      },
      new_chat_member: {
        id: 322950358,
        first_name: 'Denis'
      },
      new_chat_members: [
        {
          id: 322950358,
          first_name: 'Denis'
        }
      ]
    });

    const db = new Db(client);
    const bot = new BotMock();

    var handler = new messageHandlers.NewChatMemberHandler(message, bot, db);

    await handler.handle();

    var queryResult1 = await client.query('\
      SELECT *\
      FROM tg_chat_user_mtm\
      WHERE tg_chat_id = $1 AND tg_user_id = $2',
      [-153286219, 322950358]
    );

    var queryResult2 = await client.query('\
      SELECT *\
      FROM tg_chat_user_mtm\
      WHERE tg_chat_id = $1 AND tg_user_id = $2',
      [-153286219, 128540035]
    );

    assert.equal(queryResult1.rowCount, 1);
    assert.equal(queryResult2.rowCount, 1);
    assert.equal(bot.sendMessageCallCount, 1);
    assert.equal(bot.getMeCallCount, 1);
  }
);

exports.testHandleNewChatMemberWhenAddBot = new TransactionScopeTest(
  'test add bot',
  async function(client) {

    const message = new TelegramMessage({
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
      new_chat_participant: {
        id: 123,
        username: 'test'
      },
      new_chat_member: {
        id: 123,
        username: 'test'
      },
      new_chat_members: [
        {
          id: 123,
          username: 'test'
        }
      ]
    });

    const db = new Db(client);
    const bot = new BotMock();

    var handler = new messageHandlers.NewChatMemberHandler(message, bot, db);

    await handler.handle();

    assert.equal(bot.sendMessageCallCount, 0);
    assert.equal(bot.getMeCallCount, 1);
  }
);
