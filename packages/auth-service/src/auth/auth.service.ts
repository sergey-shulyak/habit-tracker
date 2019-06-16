import {
  InvalidCredentialsError,
  UserConflictError,
  UserNotFoundError,
} from './errors'

import { CryptoService } from './crypto.service'
import { Injectable, Inject } from '@nestjs/common'
import { JwtService } from './jwt.service'
import { IUser, USER_SERVICE, MAIL_SERVICE } from '@habit-tracker/shared'
import { ClientProxy } from '@nestjs/microservices'

@Injectable()
export class AuthService {
  public constructor(
    @Inject(USER_SERVICE) private readonly userService: ClientProxy,
    @Inject(MAIL_SERVICE) private readonly mailService: ClientProxy,
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

    let createdUser
    try {
      createdUser = await this.userService.send('create', user).toPromise()
    } catch (err) {
      // TODO: Add detail of field
      throw new UserConflictError()
    }

    await this.mailService.emit('sendRegistrationConfirmation', createdUser)

    return this.jwtService.sign(createdUser)
  }

  public async verifyUser(email: string, password: string) {
    const user: IUser = await this.userService
      .send('findOneByEmail', email)
      .toPromise()

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

  public signIn(user: IUser) {
    const { id, email, name } = user

    return this.jwtService.sign({ id, email, name })
  }
}
