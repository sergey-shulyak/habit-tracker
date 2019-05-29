import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'

import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { SignUpUserDto } from './dto/signUpUser.dto'

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('signup')
  public async signUp(@Body() userData: SignUpUserDto) {
    return { token: await this.authService.signUp(userData) }
  }

  @Post('signin')
  @UseGuards(AuthGuard('local'))
  public async signIn(@Req() req: Express.Request) {
    return { token: await this.authService.signIn(req.user) }
  }
}
