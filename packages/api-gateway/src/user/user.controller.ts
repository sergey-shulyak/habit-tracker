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
} from '@nestjs/common';

// import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
// import { UserNotFoundError } from './errors';
// import { UserService } from './user.service';

@Controller('users')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Get()
  // @UseGuards(AuthGuard())
  public findAll() {
    return this.userService.findAll();
  }

  @Post()
  public create(@Body() user: CreateUserDto) {
    this.userService.create(user);
  }

  @Get(':id')
  // @UseGuards(AuthGuard())
  public async findOne(@Param('id') id: string) {
    const user = await this.userService.findOneById(id);

    // if (!user) {
    //   throw new UserNotFoundError();
    // }

    return user;
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  // @UseGuards(AuthGuard())
  public updateOne(@Param('id') id: string, @Body() user: UpdateUserDto) {
    this.userService.update(id, user);
  }

  @Delete(':id')
  // @UseGuards(AuthGuard())
  public deleteOne(@Param('id') id: string) {
    this.userService.delete(id);
  }

  @Get('/confirm/:id')
  public confirmEmail(@Param('id') id: string) {
    this.userService.confirmEmail(id);
  }
}
