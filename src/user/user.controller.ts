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
} from '@nestjs/common'
import { CreateUserDto, UpdateUserDto } from './dto/user.dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
  public constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  @Get()
  public findAll() {
    return this.userService.findAll()
  }

  @Post()
  public create(@Body() user: CreateUserDto) {
    this.userService.create(user)
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.userService.findById(id)
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public updateOne(@Param('id') id: string, @Body() user: UpdateUserDto) {
    this.userService.update(id, user)
  }

  @Delete(':id')
  public deleteOne(@Param('id') id: string) {
    this.userService.delete(id)
  }
}
