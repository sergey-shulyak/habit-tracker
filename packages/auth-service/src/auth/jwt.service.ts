import * as jwt from 'jsonwebtoken'

import { Injectable } from '@nestjs/common'
import { promisify } from 'util'
import { JwtPayload } from '@habit-tracker/shared/auth';

const sign = promisify(jwt.sign) as (
  arg1: string | object | Buffer,
  arg2: jwt.Secret,
) => Promise<string>

@Injectable()
export class JwtService {
  public sign(user: JwtPayload) {
    return sign(user, process.env.AUTH_JWT_SECRET || 'HD<-XdS,n3d#N3k!')
  }
}
