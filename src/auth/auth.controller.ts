import {
  Controller,
  Post,
  Body,
  Session,
  Get,
  UseInterceptors,
} from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { CurrentUserInterceptor } from 'src/interceptors/current-user.interceptor';
import { CurrentUserDecorator } from './decorators/current-user.decorator';
import { User } from './User.entity';
import { UserDto } from './dtos/user.dto';
import { UserSerilizerInterceptor } from './interceptors/user-serializer.intercepto';

@Controller('auth')
@UseInterceptors(CurrentUserInterceptor)
@UseInterceptors(new UserSerilizerInterceptor(UserDto))
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() body: LoginUserDto, @Session() session: any) {
    return await this.authService.login(body, session);
  }

  @Post('/register')
  async regiter(@Body() body: CreateUserDto, @Session() session: any) {
    return await this.authService.register(body, session);
  }

  @Get('/current-user')
  getCurrentUser(@CurrentUserDecorator() user: User) {
    return user;
  }

  @Get('/logout')
  logout(@Session() session: any) {
    session.userId = null;
    return;
  }
}
