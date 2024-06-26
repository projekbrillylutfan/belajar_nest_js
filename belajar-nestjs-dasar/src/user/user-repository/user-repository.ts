import { Injectable } from '@nestjs/common';
import { PrismaServeService } from 'src/prisma-service/prisma-serve/prisma-serve.service';

@Injectable()
export class UserRepository {
  constructor(private prismaService = PrismaServeService) {}

  save(fistName: string, lastName: string) {
    this.prismaService.user.create({
      data: {
        firstName,
        lastName,
      },
    });
  }
}
