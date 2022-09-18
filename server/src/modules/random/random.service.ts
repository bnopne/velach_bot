import { Injectable } from '@nestjs/common';

const CHARSET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

@Injectable()
export class RandomService {
  getString(length: number): string {
    const result: string[] = [];

    for (let i = 0; i <= length; i++) {
      result.push(CHARSET[Math.floor(Math.random() * CHARSET.length)]);
    }

    return result.join('');
  }
}
