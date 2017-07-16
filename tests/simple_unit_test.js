const BaseUnitTest = require('./base_unit_test');

class SimpleUnitTest extends BaseUnitTest {

  async run() {
    await this._test();
  };

};

module.exports = SimpleUnitTest;
