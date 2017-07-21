const BaseDbModule = require('./base_module');

class ChatsAndUsersModule extends BaseDbModule {

  async createOrUpdateChat(chat) {
    var QUERY = '\
      INSERT INTO tg_chat\
        (id)\
      VALUES\
        ($1)\
      ON CONFLICT (id) DO NOTHING\
      RETURNING *';

    var queryResult = await this._client.query(QUERY, [chat.getId()]);
    return queryResult.rows[0];
  };

  async createOrUpdateUser(user) {
    const QUERY = '\
      INSERT INTO tg_user\
        (id, username, first_name, last_name)\
      VALUES\
        ($1, $2, $3, $4)\
      ON CONFLICT (id) DO UPDATE SET\
        username = $2,\
        first_name = $3,\
        last_name = $4\
      RETURNING *';

    const QUERY_PARAMS = [
      user.getId(),
      user.getUsername(),
      user.getFirstName(),
      user.getLastName()
    ];

    var queryResult = await this._client.query(QUERY, QUERY_PARAMS);
    return queryResult.rows[0];
  };

  async addUserToChat(user, chat) {
    var QUERY = '\
      INSERT INTO tg_chat_user_mtm\
        (tg_chat_id, tg_user_id)\
      VALUES\
        ($1, $2)\
      ON CONFLICT (tg_chat_id, tg_user_id) DO NOTHING\
      RETURNING *';

    var queryResult = await this._client.query(QUERY, [chat.getId(), user.getId()]);
    return queryResult.rows[0];
  };

  async makeSureChatAndUserExist(chat, user) {
    await this.createOrUpdateChat(chat);

    if (user) {
      await this.createOrUpdateUser(user);
      await this.addUserToChat(user, chat);
    };
  };

  async getChatGreetingMessage(chat) {
    var QUERY = 'SELECT greeting_message FROM tg_chat WHERE id = $1';

    var queryResult = await this._client.query(QUERY, [chat.getId()]);

    if (queryResult.rowCount == 0) {
      throw new Error(`chat ${chat.getId()} does not exist!`);
    };

    return queryResult.rows[0].greeting_message;
  };

  async setGreetingMessage(chatId, message) {
    var QUERY = '\
      UPDATE tg_chat\
      SET greeting_message = $1\
      WHERE id = $2\
      RETURNING *';

    const queryResult = await this._client.query(QUERY, [message, chatId]);
    return queryResult.rows[0];
  };

  async checkBike(userId, chatId, bikePhotoId) {
    var QUERY = '\
      UPDATE tg_chat_user_mtm\
      SET bike_check = true, bike_photo_id = $3\
      WHERE tg_chat_id = $1 AND tg_user_id = $2\
      RETURNING *';

    const queryResult = await this._client.query(QUERY, [chatId, userId, bikePhotoId]);
    return queryResult.rows[0];
  };

  async uncheckBike(userId, chatId) {
    var QUERY = '\
      UPDATE tg_chat_user_mtm\
      SET\
        bike_check = false,\
        bike_photo_id = NULL\
      WHERE tg_chat_id = $1 AND tg_user_id = $2\
      RETURNING *';

    const queryResult = await this._client.query(QUERY, [chatId, userId]);
    return queryResult.rows[0];
  };

  async bikeCheck(userId, chatId) {
    var QUERY = 'SELECT bike_check FROM tg_chat_user_mtm WHERE tg_user_id = $1 AND tg_chat_id = $2';

    const queryResult = await this._client.query(QUERY, [userId, chatId]);
    return queryResult.rows[0].bike_check;
  };

};

module.exports = ChatsAndUsersModule;
