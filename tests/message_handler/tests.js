const assert = require('chai').assert;
const TransactionScopeTest = require('../transaction_scope_test');
const MessageHandler = require('../../message_handler');
const Db = require('../../db');

class BotMock {

  constructor() {
    this.sendMessageCallCount = 0;
  };

  async sendMessage(chatId, text) {
    this.sendMessageCallCount += 1;
  };

};

exports.makeSureUserNewChatMemberAndChatExist = new TransactionScopeTest(
  'make sure user, new chat member and chat exist',
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
    };

    const db = new Db(client);
    const bot = new BotMock();

    var handler = new MessageHandler(message, bot, db);

    await handler.handleMessage();

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
  }
)