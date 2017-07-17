const assert = require('chai').assert;
const SimpleUnitTest = require('../simple_unit_test');
const MessageRouter = require('../../message_router');

exports.testTryParseCommandWhenCommandPresent = new SimpleUnitTest(
  'test try parse command when command is present',
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
      date: 1500128213,
      text: '/kek sdfasdasdfasd'
    };

    const router = new MessageRouter(message, null, null);

    const command = router._tryParseCommand();

    assert.equal(command, 'kek');

  }
);

exports.testTryParseCommandNotPresent = new SimpleUnitTest(
  'test try parse command when command is not present',
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
      date: 1500128213,
      text: 'sdfasdasdfasd'
    };

    const router = new MessageRouter(message, null, null);

    const command = router._tryParseCommand();

    assert.notExists(command);

  }
);
