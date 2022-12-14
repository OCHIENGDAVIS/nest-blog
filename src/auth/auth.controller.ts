import {
  Controller,
  Post,
  Body,
  Session,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { CurrentUserInterceptor } from 'src/interceptors/current-user.interceptor';
import { CurrentUserDecorator } from './decorators/current-user.decorator';
import { User } from './User.entity';
import { UserDto } from './dtos/user.dto';
import { EntitySerilizerInterceptor } from './interceptors/entity-serializer.intercepto';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(new EntitySerilizerInterceptor(UserDto))
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
  @UseInterceptors(CurrentUserInterceptor)
  logout(@Session() session: any, @CurrentUserDecorator() user: User) {
    session.userId = null;
    user = null;
    return;
  }
}
