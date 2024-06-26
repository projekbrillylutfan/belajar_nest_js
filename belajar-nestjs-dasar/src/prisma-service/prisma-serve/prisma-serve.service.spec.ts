import { Test, TestingModule } from '@nestjs/testing';
import { PrismaServeService } from './prisma-serve.service';

describe('PrismaServeService', () => {
  let service: PrismaServeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaServeService],
    }).compile();

    service = module.get<PrismaServeService>(PrismaServeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
