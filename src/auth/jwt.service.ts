import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { IUser } from 'src/user/interfaces/user.interface'
import * as jwt from 'jsonwebtoken'
import { JwtPayload } from './interfaces/jwtPayload.interface'
import { promisify } from 'util'

const sign = promisify(jwt.sign) as (
  arg1: string | object | Buffer,
  arg2: jwt.Secret,
) => Promise<string>

const verify = promisify(jwt.verify) as (
  token: string,
  secretOrPublicKey: string | Buffer,
  options?: jwt.VerifyOptions,
) => Promise<string | object>

@Injectable()
export class JwtService {
  public async sign(user: JwtPayload) {
    return sign(user, process.env.AUTH_JWT_SECRET)
  }

  public async verify(token: string) {
    return verify(token, process.env.AUTH_JWT_SECRET)
  }
}
