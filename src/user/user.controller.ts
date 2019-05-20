import { Body, Controller, Get, Inject, Post } from '@nestjs/common'
import { UserDto } from './dto/user.dto'
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
  public create(@Body() user: UserDto) {
    this.userService.create(user)
  }
}
