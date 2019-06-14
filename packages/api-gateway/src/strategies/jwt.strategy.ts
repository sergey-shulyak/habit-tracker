import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common'

import { JwtPayload } from '@habit-tracker/shared/auth'
import { PassportStrategy } from '@nestjs/passport'
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: false,
      secretOrKey: process.env.AUTH_JWT_SECRET,
    })
  }

  public async validate(tokenPayload: JwtPayload) {
    const user = await this.userService.send('findOneById', tokenPayload.id)

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
