import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
    console.log('prisma service');
  }

  async onModuleInit() {
    console.info('on module init');
    await this.$connect();
  }

  async onModuleDestroy() {
    console.info('on module destroy');
    this.$disconnect();
  }
}
