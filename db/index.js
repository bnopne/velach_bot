const pg = require('pg');

const modules = require('./modules');

class Db {

  constructor(client) {
    this._client = client;

    this.chatsAndUsers = new modules.ChatsAndUsersModule(this._client, {});
  };

};

module.exports = Db;
