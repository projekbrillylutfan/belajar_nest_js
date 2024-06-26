import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaServeService extends PrismaClient {
  constructor() {
    super();
    console.info('create prisma client');
  }
}
