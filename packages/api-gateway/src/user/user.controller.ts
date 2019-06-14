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

// import { AuthGuard } from '@nestjs/passport';
import { ClientProxy } from '@nestjs/microservices'
import { CreateUserDto, UpdateUserDto, UserNotFoundError } from '@habit-tracker/shared/user'

// import { UserNotFoundError } from './errors';

@Controller('users')
export class UserController {
  public constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
  ) {}

  @Get()
  // @UseGuards(AuthGuard())
  public async findAll() {
    return await this.userService.send('findAll', '')
  }

  @Post()
  public create(@Body() user: CreateUserDto) {
    this.userService.send('create', user)
  }

  @Get(':id')
  // @UseGuards(AuthGuard())
  public async findOne(@Param('id') id: string) {
    // const user = await this.userService.findOneById(id)
    const user = await this.userService.send('findOneById', id)


    if (!user) {
      throw new UserNotFoundError();
    }

    return user
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  // @UseGuards(AuthGuard())
  public updateOne(@Param('id') id: string, @Body() user: UpdateUserDto) {
    // this.userService.update(id, user)
    // this.userService.send('update', {id, data})
  }

  @Delete(':id')
  // @UseGuards(AuthGuard())
  public deleteOne(@Param('id') id: string) {
    this.userService.send('delete', id)

  }

  @Get('/confirm/:id')
  public confirmEmail(@Param('id') id: string) {
    this.userService.send('confirmEmail', id)
  }
}
