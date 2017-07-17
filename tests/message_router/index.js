const tests = require('./tests');

describe('Test MessageRouter', function() {

  for (var testName in tests) {

    test = tests[testName];

    it(test.getDescription(), async function() {
      return await test.run();
    });

  };

});