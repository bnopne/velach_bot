import { PoolClient } from 'pg';

import { UserService } from 'src/modules/entities/user/user.service';
import { User } from 'src/modules/entities/user/user.entity';
// import { ChatService } from 'src/modules/entities/chat/chat.service';

const userService = new UserService();
// const chatService = new ChatService();

export async function seedTestDatabase(client: PoolClient): Promise<void> {
  /**
   * CREATE USERS
   */
  let billyHerrington = new User({
    id: '1',
    firstName: 'Billy',
    lastName: 'Herrington',
    isBot: false,
    stravaLink: undefined,
    username: 'billy',
  });

  let vanDarkholme = new User({
    id: '2',
    firstName: 'Van',
    lastName: 'Darkholme',
    isBot: false,
    stravaLink: 'https://strava.com/athletes/314159265',
    username: 'van',
  });

  billyHerrington = await userService.createUser(client, billyHerrington);
  vanDarkholme = await userService.createUser(client, vanDarkholme);

  /**
   * CREATE CHATS
   */
}
