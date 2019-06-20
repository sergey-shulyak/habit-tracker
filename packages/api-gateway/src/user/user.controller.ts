import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  Inject,
} from '@nestjs/common'

import { AuthGuard } from '@nestjs/passport'
import { ClientProxy } from '@nestjs/microservices'
import {
  CreateUserDto,
  UpdateUserDto,
  UserNotFoundError,
  USER_SERVICE
} from '@habit-tracker/shared/user'

@Controller('users')
export class UserController {
  public constructor(
    @Inject(USER_SERVICE) private readonly userService: ClientProxy,
  ) {}

  @Get()
  @UseGuards(AuthGuard())
  public async findAll() {
    return await this.userService.send('findAll', '').toPromise()
  }

  @Post()
  public create(@Body() user: CreateUserDto) {
    this.userService.send('create', user)
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  public async findOne(@Param('id') id: string) {
    const user = await this.userService.send('findOneById', id).toPromise()

    if (!user) {
      throw new UserNotFoundError()
    }

    return user
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard())
  public updateOne(@Param('id') id: string, @Body() user: UpdateUserDto) {
    this.userService.send('update', { id, user })
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  public deleteOne(@Param('id') id: string) {
    this.userService.send('delete', id)
  }

  @Get('/confirm/:id')
  public confirmEmail(@Param('id') id: string) {
    this.userService.send('confirmEmail', id)
  }
}
