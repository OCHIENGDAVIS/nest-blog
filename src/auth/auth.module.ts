import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { User } from './User.entity';
import { AuthService } from './auth.service';
import { AuthMiddleWare } from './middlewares/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, AuthMiddleWare],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleWare).forRoutes('/blog');
    consumer.apply(AuthMiddleWare).forRoutes('/auth/current-user');
  }
}
