const pg = require('pg');
const config = require('../../config');
const tests = require('./tests');

const pool = new pg.Pool(config.get('database:postgres'));

describe('Test MessageHandler', function() {

  for (var testName in tests) {

    test = tests[testName];

    it(test.getDescription(), async function() {
      return await test.run(pool);
    });

  };

});
