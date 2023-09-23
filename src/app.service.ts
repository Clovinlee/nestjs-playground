import { Injectable } from '@nestjs/common';
// import { User, Bookmark } from "@prisma/client";

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
