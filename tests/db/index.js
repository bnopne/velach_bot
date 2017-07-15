const pg = require('pg');
const config = require('../../config');
const modulesTests = require('./modules');

const pool = new pg.Pool(config.get('database:postgres'));


describe('Test ChatsAndUsersModule', function() {

  var tests = modulesTests.chatsAndUsers;

  for (var testName in tests) {

    test = tests[testName];

    it(test.getDescription(), async function() {
      return await test.run(pool);
    });

  };

});
