import { Repository } from 'typeorm';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/auth/User.entity';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const req = context.switchToHttp().getRequest();
    const { userId } = req.session || {};
    if (userId) {
      const user = await this.userRepo.findOne({ where: { id: userId } });
      req.currentUser = user;
    }
    return next.handle();
  }
}
