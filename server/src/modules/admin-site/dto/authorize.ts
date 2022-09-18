import { IsString } from 'class-validator';

export class RequestBody {
  @IsString()
  accessCode: string;
}

export class ResponseBody {
  token: string;

  constructor(token: string) {
    this.token = token;
  }
}
