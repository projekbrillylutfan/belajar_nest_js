import {
  Controller,
  Get,
  Header,
  HttpCode,
  Inject,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { UserService } from './user.service';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';
import { UserRepository } from '../user-repository/user-repository';
import { MemberService } from '../member/member.service';
import { User } from '@prisma/client';
@Controller('/api/users')
export class UserController {
  constructor(
    private service: UserService,
    private connection: Connection,
    private mailService: MailService,
    @Inject('EmailService') private emailService: MailService,
    private userRepository: UserRepository,
    private memberService: MemberService,
  ) {}
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
    return this.service.sayHello(name);
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

  @Get('/connection')
  async getConnection(): Promise<string> {
    this.mailService.send();

    console.info(this.memberService.getConnectionName());
    this.memberService.sendEmail();
    this.emailService.send();
    return this.connection.getName();
  }

  @Get('/create')
  async create(
    @Query('first_name') firstName: string,
    @Query('last_name') lastName: string,
  ): Promise<User> {
    return this.userRepository.save(firstName, lastName);
  }
}
