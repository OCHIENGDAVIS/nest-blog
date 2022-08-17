import { Controller, Post, Body } from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login() {
    return 'log in route';
  }

  @Post('/register')
  async regiter(@Body() body: CreateUserDto) {
    return await this.authService.register(body);
  }
}
