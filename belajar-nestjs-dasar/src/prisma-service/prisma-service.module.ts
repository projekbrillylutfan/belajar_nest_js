import { Module } from '@nestjs/common';
import { PrismaServeService } from './prisma-serve/prisma-serve.service';

@Module({
  providers: [PrismaServeService],
  exports: [PrismaServeService],
})
export class PrismaServiceModule {}
