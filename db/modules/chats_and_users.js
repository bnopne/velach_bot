const BaseDbModule = require('./base_module');

class ChatsAndUsersModule extends BaseDbModule {

  async createOrUpdateChat(client, chat) {
    var QUERY = '\
      INSERT INTO tg_chat\
        (id)\
      VALUES\
        ($1)\
      ON CONFLICT (id) DO NOTHING\
      RETURNING *';

    var queryResult = await client.query(QUERY, [chat.id]);
    return queryResult.rows[0];
  };

  async createOrUpdateUser(client, user) {
    var QUERY = '\
      INSERT INTO tg_user\
        (id, username, first_name, last_name)\
      VALUES\
        ($1, $2, $3, $4)\
      ON CONFLICT (id) DO UPDATE\
        SET username = $2\
        SET first_name = $3\
        SET last_name = $4\
      RETURNING *';

    var queryResult = client.query(QUERY, [user.id, user.username, user.first_name, user.last_name]);
    return queryResult.rows[0];
  };

  async addUserToChat(user, chat) {
    var QUERY = '\
      INSERT INTO tg_chat_user_mtm\
        (id, tg_chat_id, tg_user_id)\
      VALUES\
        (DEFAULT, $1, $2)\
      RETURNING *';

    var queryResult = clientInformation.query(QUERY, [chat.id, user.id]);
    return queryResult.rows[0];
  };


};

module.exports = ChatsAndUsersModule;
