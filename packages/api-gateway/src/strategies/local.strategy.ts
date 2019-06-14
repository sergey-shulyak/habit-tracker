import { Injectable, UnauthorizedException } from '@nestjs/common'

import { AuthService } from '@habit-tracker/auth-service'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  public constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: false,
    })
  }

  public validate(email: string, password: string) {
    return this.authService.verifyUser(email, password)
  }
}
