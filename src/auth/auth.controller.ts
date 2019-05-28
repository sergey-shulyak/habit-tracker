import { Controller, Post, Body, UseGuards, Req, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthGuard } from '@nestjs/passport'
import { callback } from './strategies/local.strategy'
import { CryptoService } from './crypto.service'
import { SignUpUserDto } from './dto/signUpUser.dto'

@Controller('auth')
export class AuthController {
  public constructor(
    private readonly authService: AuthService,
    private readonly cryptoService: CryptoService,
  ) {}

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
