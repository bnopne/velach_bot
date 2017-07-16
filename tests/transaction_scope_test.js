const BaseUnitTest = require('./base_unit_test');

class TransactionScopeTest extends BaseUnitTest {

  async run(pool) {
    const client = await pool.connect();

    await client.query('BEGIN');

    await this._test(client);

    await client.query('ROLLBACK');
  };

};

module.exports = TransactionScopeTest;
