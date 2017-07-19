const assert = require('chai').assert;
const TransactionScopeTest = require('../../transaction_scope_test');
const ChatsAndUsersModule = require('../../../db/modules/chats_and_users');
const TelegramMessage = require('../../../telegram_entities').TelegramMessage;
const TelegramChat = require('../../../telegram_entities').TelegramChat;
const TelegramUser = require('../../../telegram_entities').TelegramUser;

exports.shouldCreateOrUpdateChat = new TransactionScopeTest(
  'test create or update chat',
  async function(client) {
    var module = new ChatsAndUsersModule(client, {});

    const tgChat = new TelegramChat({
      id: -153286219,
      title: 'VelachBotTest',
      type: 'group',
      all_members_are_administrators: true
    });

    var chat = await module.createOrUpdateChat(tgChat);

    assert.exists(chat);
    assert.equal(chat.id, -153286219);
  }
);

exports.testCreateOrUpdateUser = new TransactionScopeTest(
  'test create or update user',
  async function(client) {
    var module = new ChatsAndUsersModule(client, {});

    const tgUser = new TelegramUser({
      id: 128540035,
      first_name: 'Вася',
      last_name: 'Цветомузыка',
      username: 'vasya_cvetomuzika'
    });

    var user = await module.createOrUpdateUser(tgUser);

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

    const tgChat = new TelegramChat({
      id: -153286219,
      title: 'VelachBotTest',
      type: 'group',
      all_members_are_administrators: true
    });

    var chat = await module.createOrUpdateChat(tgChat);

    const tgUser = new TelegramUser({
      id: 128540035,
      first_name: 'Вася',
      last_name: 'Цветомузыка',
      username: 'vasya_cvetomuzika'
    });

    var user = await module.createOrUpdateUser(tgUser);

    var chatUserLink = await module.addUserToChat(tgUser, tgChat);

    assert.equal(chatUserLink.tg_user_id, user.id);
    assert.equal(chatUserLink.tg_chat_id, chat.id);
  }
);

exports.testMakeSureUserAndChatExist = new TransactionScopeTest(
  'test make sure user and chat exist',
  async function(client) {
    var module = new ChatsAndUsersModule(client, {});

    const tgChat = new TelegramChat({
      id: -153286219,
      title: 'VelachBotTest',
      type: 'group',
      all_members_are_administrators: true
    });

    var chat = await module.createOrUpdateChat(tgChat);

    const tgUser = new TelegramUser({
      id: 128540035,
      first_name: 'Вася',
      last_name: 'Цветомузыка',
      username: 'vasya_cvetomuzika'
    });

    var user = await module.createOrUpdateUser(tgUser);

    await module.makeSureChatAndUserExist(tgChat, tgUser);

    var testQueryRes = await client.query(
      'SELECT * FROM tg_chat_user_mtm WHERE tg_chat_id = $1 AND tg_user_id = $2',
      [tgChat.getId(), tgUser.getId()]
    );

    assert.equal(testQueryRes.rowCount, 1);
  }
);
