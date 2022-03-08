import { PoolClient } from 'pg';

import { UserService } from 'src/modules/entities/user/user.service';
import { User } from 'src/modules/entities/user/user.entity';
import { ChatService } from 'src/modules/entities/chat/chat.service';
import { Chat } from 'src/modules/entities/chat/chat.entity';
import { UserChatMtmService } from 'src/modules/entities/user-chat-mtm/user-chat-mtm.service';
import { BikecheckService } from 'src/modules/entities/bikecheck/bikecheck.service';

export const BILLY_ID = '1';
export const VAN_ID = '2';
export const MARK_ID = '3';
export const STEVE_ID = '4';

export const GYM_CHAT_ID = '1';
export const BILLY_PRIVATE_CHAT_ID = '2';

export async function seedTestDatabase(client: PoolClient): Promise<void> {
  const userService = new UserService();
  const chatService = new ChatService();
  const userChatMtmService = new UserChatMtmService();
  const bikecheckService = new BikecheckService();

  /**
   * Create users
   */
  let billyHerrington = new User({
    id: BILLY_ID,
    firstName: 'Billy',
    lastName: 'Herrington',
    isBot: false,
    stravaLink: undefined,
    username: 'billy',
  });

  let vanDarkholme = new User({
    id: VAN_ID,
    firstName: 'Van',
    lastName: 'Darkholme',
    isBot: false,
    stravaLink: 'https://strava.com/athletes/314159265',
    username: 'van',
  });

  let markWolff = new User({
    id: MARK_ID,
    firstName: 'Mark',
    lastName: 'Wolff',
    isBot: false,
    stravaLink: 'https://strava.com/athletes/314159265',
    username: 'mark',
  });

  let steveRambo = new User({
    id: STEVE_ID,
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
   * Create chats
   */
  let gym = new Chat({ id: GYM_CHAT_ID, title: 'Gym', type: 'supergroup' });
  let billyChat = new Chat({
    id: BILLY_PRIVATE_CHAT_ID,
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
  await bikecheckService.createActive(client, BILLY_ID, 'weewee');
  await bikecheckService.createActive(client, BILLY_ID, 'AAA');
  await bikecheckService.createActive(client, VAN_ID, 'bondage');

  const b = await bikecheckService.createActive(client, VAN_ID, 'bondage2');
  b.isActive = false;
  await bikecheckService.updateBikecheck(client, b);
}
