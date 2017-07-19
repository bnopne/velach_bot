const assert = require('chai').assert;
const SimpleUnitTest = require('../simple_unit_test');
const ChatAdminAuthProvider = require('../../message_handlers/auth_providers').ChatAdminAuthProvider;
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


exports.testAuthorizeChatAdmin = new SimpleUnitTest(
  'test authorize chat admin should success',
  async function() {

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
      date: 1500128213
    });

    const bot = new BotMock();

    const provider = new ChatAdminAuthProvider(message, bot);

    const isAuthorized = await provider.isAuthorized();

    assert.isTrue(isAuthorized, 'chat admin authorized');

  }
);

exports.testAuthorizeNonChatAdmin = new SimpleUnitTest(
  'test authorize non chat admin should fail',
  async function() {

    const message = new TelegramMessage({
      message_id: 380,
      from:
      { id: 1,
        first_name: 'Неадмин',
        last_name: 'Лох',
        username: 'puk' },
      chat:
      { id: -153286219,
        title: 'VelachBotTest',
        type: 'group',
        all_members_are_administrators: true },
      date: 1500128213
    });

    const bot = new BotMock();

    const provider = new ChatAdminAuthProvider(message, bot);

    const isAuthorized = await provider.isAuthorized();

    assert.isFalse(isAuthorized, 'non chat admin not authorized');

  }
);
