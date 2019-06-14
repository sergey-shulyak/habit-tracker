import {
  Controller,
} from '@nestjs/common';

import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserNotFoundError } from './errors';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('users')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'findAll' })
  public findAll() {
    return this.userService.findAll();
  }

  @MessagePattern({ cmd: 'create' })
  public create(user: CreateUserDto) {
    return this.userService.create(user);
  }

  @MessagePattern({ cmd: 'findOne' })
  public async findOne(id: string) {
    const user = await this.userService.findOneById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }

  @MessagePattern({ cmd: 'updateOne' })
  public updateOne(id: string, user: UpdateUserDto) {
    this.userService.update(id, user);
  }

  @MessagePattern({ cmd: 'deleteOne' })
  public deleteOne(id: string) {
    return this.userService.delete(id);
  }

  @MessagePattern({ cmd: 'confirmEmail' })
  public confirmEmail(id: string) {
    this.userService.confirmEmail(id);
  }
}
