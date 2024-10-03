import { IsString, IsDefined } from 'class-validator';

export class SignInWithPasscodeBody {
  @IsDefined()
  @IsString()
  passcode: string;
}
