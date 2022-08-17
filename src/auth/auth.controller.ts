import { Controller, Post, Body } from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class AuthController {
  @Post('/login')
  login() {
    return 'log in route';
  }

  @Post('/register')
  regiter(@Body() body: CreateUserDto) {
    console.log(body);
    return 'register route';
  }
}
