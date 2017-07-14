const pg = require('pg');

class Db {

  constructor(poolConfig) {
    this.pool = new pg.Pool(poolConfig);
  };

};

module.exports = Db;
