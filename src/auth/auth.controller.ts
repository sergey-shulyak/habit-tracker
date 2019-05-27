import { Controller, Post, Inject, Body, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignInCredentialsDto } from './dto/signIn.dto'
import { CreateUserDto } from 'src/user/dto/user.dto'
import { User } from 'src/user/user.entity'
import { CryptoService } from './crypto.service'

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('signup')
  public async signUp(@Body() userData: CreateUserDto) {
    this.authService.signUp(userData)
  }

  @Post('signin')
  public async signIn(@Body() credentials: SignInCredentialsDto) {
    const authToken = await this.authService.signIn(
      credentials.email,
      credentials.password,
    )
  }
}
