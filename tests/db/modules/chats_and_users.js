const assert = require('chai').assert;
const TransactionScopeTest = require('../../transaction_scope_test');
const ChatsAndUsersModule = require('../../../db/modules/chats_and_users');

exports.shouldCreateOrUpdateChat = new TransactionScopeTest(
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

exports.testCreateOrUpdateUser = new TransactionScopeTest(
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

exports.testAddUserToChat = new TransactionScopeTest(
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

exports.testMakeSureUserAndChatExist = new TransactionScopeTest(
  'test make sure user and chat exist',
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

    await module.makeSureChatAndUserExist(chat, user);

    var testQueryRes = await client.query(
      'SELECT * FROM tg_chat_user_mtm WHERE tg_chat_id = $1 AND tg_user_id = $2',
      [chat.id, user.id]
    );

    assert.equal(testQueryRes.rowCount, 1);
  }
);
