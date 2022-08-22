import { InjectRepository } from '@nestjs/typeorm';
import {
  NestMiddleware,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';

import { User } from '../User.entity';

interface CustomRequest extends Request {
  currentUser?: User;
}

@Injectable()
export class AuthMiddleWare implements NestMiddleware {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  async use(req: CustomRequest, res: Response, next: NextFunction) {
    const { userId } = req.session;
    if (userId) {
      const user = await this.userRepo.findOne({ where: { id: userId } });
      if (!user) {
        throw new HttpException('not lohed in', HttpStatus.FORBIDDEN);
      }
      req.currentUser = user;
    }
    next();
  }
}
