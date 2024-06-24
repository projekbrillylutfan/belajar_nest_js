import { Controller, Get, Header, HttpCode, Param, Post, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
@Controller('/api/users')
export class UserController {
  @Post()
  post(): string {
    return 'Hello World!';
  }

  @Get('/sample')
  get(): string {
    return 'getting user';
  }

  @Get('/id')
  getId(@Param('id') id: string): string {
    return `Get ${id}`;
  }

  @Get('/hello')
  sayHello(@Query('name') name: string): string {
    return `Hello ${name}`;
  }

  @Get('/sample-response')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  sampleResponse(): Record<string, string> {
    return {
      name: 'John',
      age: '30',
    };
  }
}
