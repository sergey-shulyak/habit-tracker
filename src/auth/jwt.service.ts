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

@Injectable()
export class JwtService {
  public sign(user: JwtPayload) {
    return sign(user, process.env.AUTH_JWT_SECRET)
  }
}
