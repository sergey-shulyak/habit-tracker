import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'

import { AuthService } from './auth.service'
import { SignUpUserDto, IUser } from '@habit-tracker/shared'
import { MessagePattern } from '@nestjs/microservices'

@Controller()
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @MessagePattern('signUp')
  public async signUp(@Body() userData: SignUpUserDto) {
    return { token: await this.authService.signUp(userData) }
  }

  @MessagePattern('signIn')
  public async signIn(user: IUser) {
    return { token: await this.authService.signIn(user) }
  }

  @MessagePattern('verifyUser')
  public async verifyUser({
    email,
    password,
  }: {
    email: string
    password: string
  }) {
    return this.authService.verifyUser(email, password)
  }
}
