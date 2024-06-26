import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prismaService = PrismaService) {
    console.log('create user repository');
  }

  async save(fistName: string, lastName: string) {
    return this.prismaService.user.create({
      
    })
  }
}
