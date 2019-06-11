import * as jwt from 'jsonwebtoken'

import { Injectable } from '@nestjs/common'
import { JwtPayload } from './interfaces/jwtPayload.interface'
import { promisify } from 'util'

const sign = promisify(jwt.sign) as (
  arg1: string | object | Buffer,
  arg2: jwt.Secret,
) => Promise<string>

@Injectable()
export class JwtService {
  public sign(user: JwtPayload) {
    return sign(user, process.env.AUTH_JWT_SECRET)
  }
}
