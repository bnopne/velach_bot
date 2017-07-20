const assert = require('chai').assert;
const TransactionScopeTest = require('../transaction_scope_test');
const Db = require('../../db');
const BaseCommandHandler = require('../../message_handlers/command_handlers/base_command_handler');
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

exports.test1 = new TransactionScopeTest(
  'test fitsMessage on valid message',
  async function(client) {

    const message = new TelegramMessage({
      message_id: 497,
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
      date: 1500506659,
      text: '/test sdfgasdfas',
      entities: [ { type: 'bot_command', offset: 0, length: 5 } ]
    });

    const db = new Db(client);
    const bot = new BotMock();

    var handler = new BaseCommandHandler(message, bot, db);

    // MONKEY PATCH!!!
    handler._command = 'test';

    const fitsMessage = await handler.fitsMessage();

    assert.isTrue(fitsMessage);

  }
);

exports.test2 = new TransactionScopeTest(
  'test fitsMessage on message without command',
  async function(client) {

    const message = new TelegramMessage({
      message_id: 497,
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
      date: 1500506659,
      text: 'sdfgasdfas',
    });

    const db = new Db(client);
    const bot = new BotMock();

    var handler = new BaseCommandHandler(message, bot, db);

    // MONKEY PATCH!!!
    handler._command = 'test';

    const fitsMessage = await handler.fitsMessage();

    assert.isFalse(fitsMessage);

  }
);

exports.test3 = new TransactionScopeTest(
  'test fitsMessage on message with invalid command',
  async function(client) {

    const message = new TelegramMessage({
      message_id: 497,
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
      date: 1500506659,
      text: '/test sdfgasdfas',
      entities: [ { type: 'bot_command', offset: 0, length: 5 } ]
    });

    const db = new Db(client);
    const bot = new BotMock();

    var handler = new BaseCommandHandler(message, bot, db);

    // MONKEY PATCH!!!
    handler._command = 'testtest';

    const fitsMessage = await handler.fitsMessage();

    assert.isFalse(fitsMessage);

  }
);
