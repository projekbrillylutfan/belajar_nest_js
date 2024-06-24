import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as httpMock from 'node-mocks-http';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return "Hello World!"', () => {
    const res = httpMock.createResponse();
    controller.viewHello('John', res);

    expect(res._getRenderView()).toBe('index.html');
    expect(res._getRenderData()).toEqual({
      title: 'template engine',
      name: 'John',
    });
  });
});
