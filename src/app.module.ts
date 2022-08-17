import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { User } from './auth/User.entity';
import { Blog } from './blog/blog.entity';
@Module({
  imports: [
    AuthModule,
    BlogModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      synchronize: false,
      entities: [User, Blog],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
