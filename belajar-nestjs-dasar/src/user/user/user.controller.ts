import {
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';
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

  @Get('/test')
  async getTest(@Query('name') name: string): Promise<string> {
    return `Hello ${name}`;
  }

  @Get('/set-cookie')
  setCookie(@Query('name') name: string, @Res() res: Response) {
    res.cookie('name', name);
    res.status(200).send('ok');
  }

  @Get('/get-cookie')
  getCookie(@Req() req: Request): string {
    return req.cookies['name'];
  }

  @Get('/view/hello')
  viewHello(@Query('name') name: string, @Res() res: Response) {
    res.render('index.html', {
      title: 'template engine',
      name: name,
    });
  }
}
