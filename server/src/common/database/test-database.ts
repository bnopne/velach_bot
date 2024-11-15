import { PoolClient } from 'pg';

import { UserService } from 'src/modules/entities/user/user.service';
import { User } from 'src/modules/entities/user/user.entity';
import { ChatService } from 'src/modules/entities/chat/chat.service';
import { Chat } from 'src/modules/entities/chat/chat.entity';
import { UserChatMtmService } from 'src/modules/entities/user-chat-mtm/user-chat-mtm.service';
import { BikecheckService } from 'src/modules/entities/bikecheck/bikecheck.service';
import { AdminService } from 'src/modules/entities/admin/admin.service';

export const USER_IDS = {
  BILLY: '1',
  VAN: '2',
  MARK: '3',
  STEVE: '4',
};

export const CHAT_IDS = {
  GYM: '1',
  BILLY_PRIVATE: '2',
};

export async function seedTestDatabase(client: PoolClient): Promise<void> {
  const userService = new UserService();
  const chatService = new ChatService();
  const userChatMtmService = new UserChatMtmService();
  const bikecheckService = new BikecheckService();
  const adminService = new AdminService();

  /**
   * Create users
   */
  let billyHerrington = new User({
    id: USER_IDS.BILLY,
    firstName: 'Billy',
    lastName: 'Herrington',
    isBot: false,
    stravaLink: undefined,
    username: 'billy',
  });

  let vanDarkholme = new User({
    id: USER_IDS.VAN,
    firstName: 'Van',
    lastName: 'Darkholme',
    isBot: false,
    stravaLink: 'https://strava.com/athletes/314159265',
    username: 'van',
  });

  let markWolff = new User({
    id: USER_IDS.MARK,
    firstName: 'Mark',
    lastName: 'Wolff',
    isBot: false,
    stravaLink: 'https://strava.com/athletes/314159265',
    username: 'mark',
  });

  let steveRambo = new User({
    id: USER_IDS.STEVE,
    firstName: 'Steve',
    lastName: 'Rambo',
    isBot: false,
    stravaLink: 'https://strava.com/athletes/314159265',
    username: 'steve',
  });

  billyHerrington = await userService.createUser(client, billyHerrington);
  vanDarkholme = await userService.createUser(client, vanDarkholme);
  markWolff = await userService.createUser(client, markWolff);
  steveRambo = await userService.createUser(client, steveRambo);

  /**
   * Admins
   */
  await adminService.insertAdmin(client, billyHerrington.id);

  /**
   * Create chats
   */
  let gym = new Chat({ id: CHAT_IDS.GYM, title: 'Gym', type: 'supergroup' });
  let billyChat = new Chat({
    id: CHAT_IDS.BILLY_PRIVATE,
    title: undefined,
    type: 'private',
  });

  gym = await chatService.createChat(client, gym);
  billyChat = await chatService.createChat(client, billyChat);

  /**
   * Add users to chats
   */
  await userChatMtmService.create(client, vanDarkholme.id, gym.id);
  await userChatMtmService.create(client, markWolff.id, gym.id);
  await userChatMtmService.create(client, steveRambo.id, gym.id);
  await userChatMtmService.create(client, billyHerrington.id, billyChat.id);

  /**
   * Add bikechecks
   */
  await bikecheckService.createActive(client, USER_IDS.BILLY, 'weewee');
  await bikecheckService.createActive(client, USER_IDS.BILLY, 'AAA');
  await bikecheckService.createActive(client, USER_IDS.VAN, 'bondage');

  const b = await bikecheckService.createActive(
    client,
    USER_IDS.VAN,
    'bondage2',
  );
  b.isActive = false;
  await bikecheckService.updateBikecheck(client, b);
}
