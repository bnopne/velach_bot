class BaseDbModule {

  constructor(connectionPool, neededModules) {
    this._pool = connectionPool;
    this._neededModules = neededModules;

    this._decorateMethods();
  };

  _getMethodsToDecorate() {
    return [];
  };

  _clientDecorator(func) {
    return async function() {
      var args = Array.from(arguments);

      const client = await this._pool.connect();

      args.unshift(client);

      var result = null;

      try {

        await client.query('BEGIN');
        result = await func.apply(this, args);
        await client.query('COMMIT');

      } catch (err) {

        client.query('ROLLBACK');
        throw err;

      } finally {

        client.release();

      };

      return result;
    };
  };

  _decorateMethods() {
    this._getMethodsToDecorate().forEach((methodName) => {
      this[methodName] = this._clientDecorator(this[methodName]).bind(this);
    })
  };

};

module.exports = BaseDbModule;
