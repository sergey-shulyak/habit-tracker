import { Injectable, Logger } from '@nestjs/common';

import { IUser } from '@habit-tracker/shared';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findAll() {
    return await this.userRepository.find();
  }

  public create(user: IUser) {
    Logger.debug('User created')
    return this.userRepository.save(user);
  }

  public findOneById(id: string) {
    return this.userRepository.findOne(id);
  }

  public findOneByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }

  public update(id: string, userData: IUser) {
    this.userRepository.update(id, userData);
  }

  public delete(id: string) {
    this.userRepository.delete(id);
  }

  public confirmEmail(id: string) {
    this.userRepository.update({ id }, { isEmailConfirmed: true });
  }
}
