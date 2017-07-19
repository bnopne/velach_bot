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
