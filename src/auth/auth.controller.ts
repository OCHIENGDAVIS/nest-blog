import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('/login')
  login() {
    return 'log in route';
  }

  @Post('/register')
  regiter() {
    return 'register route';
  }
}
