import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './User.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  async login(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('email not found');
    }
    const [salt, storedHash] = user.password.split('.');
    const newHash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== newHash.toString('hex')) {
      throw new BadRequestException('invalid password');
    }
    // setup Cookie authentication here
    return user;
  }

  async register(createUserDto: CreateUserDto) {
    const { email, password, username } = createUserDto;
    const emailExists = await this.userRepo.findOne({ where: { email } });
    if (emailExists) {
      throw new BadRequestException('email in use');
    }
    const usernameExists = await this.userRepo.findOne({ where: { username } });
    if (usernameExists) {
      throw new BadRequestException('username in use');
    }
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    const user = this.userRepo.create({ email, username, password: result });
    await this.userRepo.save(user);
    return user;
  }
}
