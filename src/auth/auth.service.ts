import { Injectable } from '@nestjs/common'

import { UserService } from '../user/user.service'
import { JwtService } from './jwt.service'
import { CryptoService } from './crypto.service'
import { IUser } from 'src/user/interfaces/user.interface'
import { UserNotFoundError, InvalidCredentialsError } from './errors'

@Injectable()
export class AuthService {
  public constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly cryptoService: CryptoService,
  ) {}

  public async signUp(userData: IUser) {
    const { email, name, password } = userData

    const user = {
      email,
      name,
      password: await this.cryptoService.hash(password),
    }

    // TODO: Check if exist in exception from uniq
    const createdUser = await this.userService.create(user)

    // TODO: Send email

    return this.jwtService.sign(createdUser)
  }

  public async verifyUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email)

    if (!user) {
      throw new UserNotFoundError()
    }

    const passwordsMatch = await this.cryptoService.verify(
      password,
      user.password,
    )

    if (!passwordsMatch) {
      throw new InvalidCredentialsError()
    }

    return user
  }

  public async signIn(user: IUser) {
    const { id, email, name } = user

    return await this.jwtService.sign({ id, email, name })
  }
}
