var assert = require('chai').assert;

var config = require('../../config');

describe('Test config module', function() {

  it('has keys in it', function() {
    var k = config.get('database:postgres:puk');

    assert.typeOf(k, 'string');
  })

});
