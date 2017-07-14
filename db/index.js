const pg = require('pg');

const modules = require('./modules');

class Db {

  constructor(poolConfig) {
    this._pool = new pg.Pool(poolConfig);

    this.chatsAndUsers = new modules.ChatsAndUsersModule(this._pool, {});
  };

};

module.exports = Db;
