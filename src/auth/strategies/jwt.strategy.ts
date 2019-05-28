import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt'

import { JwtPayload } from '../interfaces/jwtPayload.interface'
import { UserService } from 'src/user/user.service'

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
