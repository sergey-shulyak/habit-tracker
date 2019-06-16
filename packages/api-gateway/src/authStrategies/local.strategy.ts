import { Injectable, UnauthorizedException, Inject } from '@nestjs/common'

import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AUTH_SERVICE } from '@habit-tracker/shared'
import { ClientProxy } from '@nestjs/microservices'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  public constructor(
    @Inject(AUTH_SERVICE) private readonly authService: ClientProxy,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: false,
    })
  }

  public validate(email: string, password: string) {
    return this.authService.send('verifyUser', { email, password }).toPromise()
  }
}
