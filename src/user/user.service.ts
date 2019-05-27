import { IUser } from './interfaces/user.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable, Logger } from '@nestjs/common'
import { Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name)

  public constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public findAll() {
    return this.userRepository.find()
  }

  public create(user: IUser) {
    this.userRepository.save(user)
  }

  public findOneById(id: string) {
    return this.userRepository.findOne(id)
  }

  public findOneByEmail(email: string) {
    return this.userRepository.findOne({ email })
  }

  public update(id: string, userData: IUser) {
    this.userRepository.update(id, userData)
  }

  public delete(id: string) {
    this.userRepository.delete(id)
  }
}
