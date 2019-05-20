import { IUser } from './interfaces/user.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UserService {
  private userRepository: Repository<User>

  public constructor(
    @InjectRepository(User)
    userRepository: Repository<User>,
  ) {
    this.userRepository = userRepository
  }

  public findAll() {
    return this.userRepository.find()
  }

  public create(user: IUser) {
    this.userRepository.create(user)
  }
}
