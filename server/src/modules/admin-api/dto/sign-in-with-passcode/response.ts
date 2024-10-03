export class SignInWithPasscodeResponse {
  constructor(token: string) {
    this.token = token;
  }

  token: string;
}
