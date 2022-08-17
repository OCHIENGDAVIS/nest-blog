import { Controller, Post, Body } from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() body: LoginUserDto) {
    return await this.authService.login(body.email, body.password);
  }

  @Post('/register')
  async regiter(@Body() body: CreateUserDto) {
    return await this.authService.register(body);
  }
}
