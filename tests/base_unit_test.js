class BaseUnitTest {

  constructor(description, test) {
    this._description = description;
    this._test = test;
  };

  getDescription() {
    return this._description;
  };

  async run() {
    throw new Error('not implemented');
  };

};

module.exports = BaseUnitTest;
