import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common'

import { JwtPayload, USER_SERVICE } from '@habit-tracker/shared'
import { PassportStrategy } from '@nestjs/passport'
import { ClientProxy } from '@nestjs/microservices'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor(
    @Inject(USER_SERVICE) private readonly userService: ClientProxy,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: false,
      secretOrKey: process.env.AUTH_JWT_SECRET || 'HD<-XdS,n3d#N3k!',
    })
  }

  public async validate(tokenPayload: JwtPayload) {
    if (!tokenPayload.id) {
      // TODO type
      throw new Error('ID should be provided in jwt')
    }
    const user = await this.userService
      .send('findOneById', tokenPayload.id)
      .toPromise()

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
