const pg = require('pg');
const config = require('../../config');
const newChatMemberHandlerTests = require('./new_chat_member_handler_tests');
const setGreetingMessageHandlerTests = require('./set_greetin_message_handler_tests');
const baseCommandHandlerTests = require('./base_command_handler_tests');

const pool = new pg.Pool(config.get('database:postgres'));

describe('Test BaseCommandHandler', function() {

  for (var testName in baseCommandHandlerTests) {

    test = baseCommandHandlerTests[testName];

    it(test.getDescription(), async function() {
      return await test.run(pool);
    });

  };

});

describe('Test NewChatMemberHandler', function() {

  for (var testName in newChatMemberHandlerTests) {

    test = newChatMemberHandlerTests[testName];

    it(test.getDescription(), async function() {
      return await test.run(pool);
    });

  };

});

describe('Test SetGreetingMessageHandler', function() {

  for (var testName in setGreetingMessageHandlerTests) {

    test = setGreetingMessageHandlerTests[testName];

    it(test.getDescription(), async function() {
      return await test.run(pool);
    });

  };

});
