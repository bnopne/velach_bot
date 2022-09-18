import { TestingModule } from '@nestjs/testing';
import { PoolClient } from 'pg';

import { disconnect } from 'src/common/database/connection';
import {
  getTestConnection,
  getTestingModule,
} from 'src/common/utils/test-utils';
import { User } from './user.entity';

import { UserService } from './user.service';

describe('Test UserService', () => {
  let userService: UserService;
  let connection: PoolClient;

  beforeEach(async () => {
    const module: TestingModule = await getTestingModule([UserService]);
    userService = module.get<UserService>(UserService);
    connection = await getTestConnection();
    await connection.query('START TRANSACTION');
  });

  afterEach(async () => {
    await connection.query('ROLLBACK');
    connection.release();
  });

  afterAll(async () => {
    await disconnect();
  });

  test('findById() returns existing user, returns null for inexistent user', async () => {
    let user = await userService.findById(connection, '1');
    expect(user?.id).toBe('1');
    expect(user?.firstName).toBe('Billy');
    expect(user?.lastName).toBe('Herrington');
    expect(user?.isBot).toBe(false);
    expect(user?.stravaLink).toBe(null);
    expect(user?.username).toBe('billy');

    user = await userService.findById(connection, '100500');
    expect(user).toBe(null);
  });

  test('getById() returns existing user, throws if user doesnt exist', async () => {
    const user = await userService.getById(connection, '1');
    expect(user?.id).toBe('1');
    expect(user?.firstName).toBe('Billy');
    expect(user?.lastName).toBe('Herrington');
    expect(user?.isBot).toBe(false);
    expect(user?.stravaLink).toBe(null);
    expect(user?.username).toBe('billy');

    try {
      await userService.getById(connection, '100500');
    } catch (err) {
      expect(err.message).toBe('User 100500 not found');
    }

    expect.assertions(7);
  });

  test('create() creates user', async () => {
    const user = new User({
      id: '101',
      firstName: 'Mark',
      lastName: 'Wolff',
      isBot: false,
      stravaLink: undefined,
      username: 'mwolff',
    });

    await userService.createUser(connection, user);

    const check = await userService.getById(connection, '101');
    expect(check?.id).toBe('101');
    expect(check?.firstName).toBe('Mark');
    expect(check?.lastName).toBe('Wolff');
    expect(check?.isBot).toBe(false);
    expect(check?.stravaLink).toBe(null);
    expect(check?.username).toBe('mwolff');
  });

  test('update() updates user', async () => {
    const billy = await userService.getById(connection, '1');
    billy.username = 'aniki';
    await userService.updateUser(connection, billy);

    const check = await userService.getById(connection, '1');
    expect(check?.id).toBe('1');
    expect(check?.firstName).toBe('Billy');
    expect(check?.lastName).toBe('Herrington');
    expect(check?.isBot).toBe(false);
    expect(check?.stravaLink).toBe(null);
    expect(check?.username).toBe('aniki');
  });

  test('createOrUpdateUser() creates new user', async () => {
    const mark = new User({
      id: '101',
      firstName: 'Mark',
      lastName: 'Wolff',
      isBot: false,
      stravaLink: undefined,
      username: 'mwolff',
    });

    await userService.createOrUpdateUser(connection, mark);

    const check = await userService.getById(connection, '101');
    expect(check?.id).toBe('101');
    expect(check?.firstName).toBe('Mark');
    expect(check?.lastName).toBe('Wolff');
    expect(check?.isBot).toBe(false);
    expect(check?.stravaLink).toBe(null);
    expect(check?.username).toBe('mwolff');
  });

  test('createOrUpdateUser() updates existing user', async () => {
    const billy = await userService.getById(connection, '1');
    billy.username = 'aniki';

    await userService.createOrUpdateUser(connection, billy);

    const check = await userService.getById(connection, '1');
    expect(check?.id).toBe('1');
    expect(check?.firstName).toBe('Billy');
    expect(check?.lastName).toBe('Herrington');
    expect(check?.isBot).toBe(false);
    expect(check?.stravaLink).toBe(null);
    expect(check?.username).toBe('aniki');
  });
});
