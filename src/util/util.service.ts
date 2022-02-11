import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilService {
  chooseRandom = function <T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  };
}
