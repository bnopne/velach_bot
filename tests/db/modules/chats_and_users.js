const assert = require('chai').assert;
const DbTestCase = require('../db_test_case');
const ChatsAndUsersModule = require('../../../db/modules/chats_and_users');

exports.shouldCreateOrUpdateChat = new DbTestCase(
  'test create or update chat',
  async function(client) {
    var module = new ChatsAndUsersModule(client, {});

    var chat = await module.createOrUpdateChat({
      id: 100500
    });

    assert.exists(chat);
    assert.equal(chat.id, 100500);
  }
);

exports.testCreateOrUpdateUser = new DbTestCase(
  'test create or update user',
  async function(client) {
    var module = new ChatsAndUsersModule(client, {});

    var user = await module.createOrUpdateUser({
      id: 100500,
      username: 'test',
      first_name: 'test',
      last_name: 'test'
    });

    assert.exists(user);
    assert.equal(user.id, 100500);
    assert.equal(user.username, 'test');
    assert.equal(user.first_name, 'test');
    assert.equal(user.last_name, 'test');
  }
);

exports.testAddUserToChat = new DbTestCase(
  'test add user to chat',
  async function(client) {
    var module = new ChatsAndUsersModule(client, {});

    var chat = await module.createOrUpdateChat({
      id: 100500
    });

    var user = await module.createOrUpdateUser({
      id: 100500,
      username: 'test',
      first_name: 'test',
      last_name: 'test'
    });

    var chatUserLink = await module.addUserToChat(user, chat);

    assert.equal(chatUserLink.tg_user_id, user.id);
    assert.equal(chatUserLink.tg_chat_id, chat.id);
  }
);
