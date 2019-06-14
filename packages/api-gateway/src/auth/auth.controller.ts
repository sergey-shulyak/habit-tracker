import { Body, Controller, Post, Req, UseGuards, Inject } from '@nestjs/common'

import { AuthGuard } from '@nestjs/passport'
import { SignUpUserDto, IUser, AUTH_SERVICE } from '@habit-tracker/shared'
import { ClientProxy } from '@nestjs/microservices'

@Controller('auth')
export class AuthController {
  public constructor(
    @Inject(AUTH_SERVICE) private readonly authService: ClientProxy,
  ) {}

  @Post('signUp')
  public async signUp(@Body() userData: SignUpUserDto) {
    return { token: await this.authService.send('signUp', userData) }
  }

  @Post('signIn')
  @UseGuards(AuthGuard('local'))
  public async signIn(@Req() req: { user: IUser }) {
    return { token: await this.authService.send('signIn', req.user) }
  }
}
