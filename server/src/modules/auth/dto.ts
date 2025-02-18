import { IsString, IsNotEmpty } from 'class-validator';

export class SignInWithPasscodeBody {
  @IsNotEmpty({ message: 'Passcode is required' })
  @IsString()
  passcode: string;
}

export class SignInWithPasscodeResponse {
  token: string;

  constructor(token: string) {
    this.token = token;
  }
}
