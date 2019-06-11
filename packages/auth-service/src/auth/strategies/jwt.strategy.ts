import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable, UnauthorizedException } from '@nestjs/common'

import { JwtPayload } from '../interfaces/jwtPayload.interface'
import { PassportStrategy } from '@nestjs/passport'
import { UserService } from '../../user/user.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: false,
      secretOrKey: process.env.AUTH_JWT_SECRET,
    })
  }

  public async validate(tokenPayload: JwtPayload) {
    const user = await this.userService.findOneById(tokenPayload.id)

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
