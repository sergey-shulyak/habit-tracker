import { Injectable } from '@nestjs/common'
import { hash, compare } from 'bcrypt'

@Injectable()
export class CryptoService {
  public async hash(password: string) {
    return hash(password, Number(process.env.AUTH_SALT_ROUNDS))
  }

  public verify(password: string, hash: string) {
    return compare(password, hash)
  }
}
