import { IsNotEmpty } from 'class-validator';

export class SignInWithPassodeBody {
  @IsNotEmpty()
  passcode: string;
}

export class SignInWithPassodeResponse {
  token: string;

  constructor(token: string) {
    this.token = token;
  }
}
