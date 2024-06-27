import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpException,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { UserService } from './user.service';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';
import { UserRepository } from '../user-repository/user-repository';
import { MemberService } from '../member/member.service';
import { User } from '@prisma/client';
import { ValidationFilter } from 'src/validation/validation.filter';
import {
  LoginUserRequest,
  loginUserRequestValidation,
} from 'src/model/login.model';
import { ValidationPipe } from 'src/validation/validation.pipe';
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

  @Get('/:id')
  getId(@Param('id', ParseIntPipe) id: number): string {
    return `Get ${id}`;
  }

  @Get('/hello')
  //@UseFilters(ValidationFilter)
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
    if (!firstName) {
      throw new HttpException(
        {
          code: 400,
          errors: 'first_name is required',
        },
        400,
      );
    }
    return this.userRepository.save(firstName, lastName);
  }

  @Post('/login')
  @UseFilters(ValidationFilter)
  @UsePipes(new ValidationPipe(loginUserRequestValidation))
  login(
    @Query('name') name: string,
    @Body() request: LoginUserRequest,
  ): string {
    return `hello ${request.username} with password ${request.password}`;
  }
}
