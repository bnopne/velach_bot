export class GetMeResponse {
  id: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  isBot?: boolean;
  stravaLink?: string;

  constructor(
    id: string,
    username?: string,
    firstName?: string,
    lastName?: string,
    isBot?: boolean,
    stravaLink?: string,
  ) {
    this.id = id;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.isBot = isBot;
    this.stravaLink = stravaLink;
  }
}
