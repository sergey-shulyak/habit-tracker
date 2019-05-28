import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common'
import { UpdateUserDto } from './dto/updateUser.dto'
import { CreateUserDto } from './dto/createUser.dto'
import { UserService } from './user.service'
import { AuthGuard } from '@nestjs/passport'
import { UserNotFoundError } from './errors'

@Controller('users')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard())
  public findAll() {
    return this.userService.findAll()
  }

  @Post()
  public create(@Body() user: CreateUserDto) {
    this.userService.create(user)
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  public async findOne(@Param('id') id: string) {
    const user = await this.userService.findOneById(id)

    if (!user) {
      throw new UserNotFoundError()
    }

    return user
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard())
  public updateOne(@Param('id') id: string, @Body() user: UpdateUserDto) {
    this.userService.update(id, user)
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  public deleteOne(@Param('id') id: string) {
    this.userService.delete(id)
  }
}
