class TransactionScopeTest {

  constructor(description, test) {
    this._description = description;
    this._test = test;
  };

  getDescription() {
    return this._description;
  };

  async run(pool) {
    const client = await pool.connect();

    await client.query('BEGIN');

    await this._test(client);

    await client.query('ROLLBACK');
  };

};

module.exports = TransactionScopeTest;
