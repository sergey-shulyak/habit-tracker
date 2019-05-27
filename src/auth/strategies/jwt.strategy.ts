import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { JwtService } from '../jwt.service'
import { JwtPayload } from '../interfaces/jwtPayload.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor(private readonly jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: false,
      secretOrKey: process.env.AUTH_JWT_SECRET,
    })
  }

  public async validate(token: string, done: Function) {
    const signedUserData = await this.jwtService.verify(token)
    done(null, signedUserData)
  }
}

export const callback = (err: Error, user: JwtPayload, info: any) => {
  let message: string

  if (err) {
    return err || new UnauthorizedException(info.message)
  } else if (typeof info != 'undefined' || !user) {
    switch (info.message) {
      case 'No auth token':
      case 'invalid signature':
      case 'jwt malformed':
      case 'invalid token':
      case 'invalid signature':
        message = 'You must provide a valid authenticated access token'
        break
      case 'jwt expired':
        message = 'Your session has expired'
        break
      default:
        message = info.message
        break
    }

    throw new UnauthorizedException(message)
  }

  return user
}
