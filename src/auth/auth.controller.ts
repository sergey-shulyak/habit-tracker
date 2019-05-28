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
    const token = await this.authService.signUp(userData)

    return { token }
  }

  @Post('signin')
  @UseGuards(AuthGuard('local'))
  public async signIn(@Req() req: Express.Request) {
    const token = await this.authService.signIn(req.user)

    return { token }
  }
}
