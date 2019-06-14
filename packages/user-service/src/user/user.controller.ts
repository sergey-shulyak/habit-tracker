import {
  Controller,
} from '@nestjs/common';

import { CreateUserDto } from '@habit-tracker/shared';
import { UpdateUserDto } from '@habit-tracker/shared';
import { UserNotFoundError } from '@habit-tracker/shared/user';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('users')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @MessagePattern('findAll')
  public findAll() {
    return this.userService.findAll();
  }

  @MessagePattern('create')
  public create(user: CreateUserDto) {
    return this.userService.create(user);
  }

  @MessagePattern('findOne')
  public async findOne(id: string) {
    const user = await this.userService.findOneById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }

  @MessagePattern('updateOne')
  public updateOne(id: string, user: UpdateUserDto) {
    this.userService.update(id, user);
  }

  @MessagePattern('deleteOne')
  public deleteOne(id: string) {
    return this.userService.delete(id);
  }

  @MessagePattern('confirmEmail')
  public confirmEmail(id: string) {
    this.userService.confirmEmail(id);
  }
}
