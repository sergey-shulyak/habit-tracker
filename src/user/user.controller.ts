import {
  Body,
  Controller,
  Get,
  Inject,
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

@Controller('users')
export class UserController {
  public constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  public findAll() {
    return this.userService.findAll()
  }

  @Post()
  public create(@Body() user: CreateUserDto) {
    this.userService.create(user)
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  public findOne(@Param('id') id: string) {
    return this.userService.findOneById(id)
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  public updateOne(@Param('id') id: string, @Body() user: UpdateUserDto) {
    this.userService.update(id, user)
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  public deleteOne(@Param('id') id: string) {
    this.userService.delete(id)
  }
}
