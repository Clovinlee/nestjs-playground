import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() //Available to all the modules without importing in each class. BUT need to be imported in app.module.ts
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule { }
