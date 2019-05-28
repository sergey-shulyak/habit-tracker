import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'

import { AuthService } from '../auth.service'
import { IUser } from 'src/user/interfaces/user.interface'
import { InvalidCredentialsError } from '../errors'

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
