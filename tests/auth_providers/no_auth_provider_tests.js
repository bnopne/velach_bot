const assert = require('chai').assert;
const SimpleUnitTest = require('../simple_unit_test');
const NoAuthProvider = require('../../message_handlers/auth_providers').NoAuthProvider;

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

exports.testAuthorize = new SimpleUnitTest(
  'test authorize user',
  async function() {

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
      date: 1500128213
    };

    const bot = new BotMock();

    const provider = new NoAuthProvider(message, bot);

    const isAuthorized = await provider.isAuthorized();

    assert.isTrue(isAuthorized);

  }
)