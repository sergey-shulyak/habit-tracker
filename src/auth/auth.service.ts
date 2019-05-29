import {
  InvalidCredentialsError,
  UserConflictError,
  UserNotFoundError,
} from './errors'

import { CryptoService } from './crypto.service'
import { IUser } from 'src/user/interfaces/user.interface'
import { Injectable } from '@nestjs/common'
import { JwtService } from './jwt.service'
import { MailService } from '../mail/mail.service'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  public constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly cryptoService: CryptoService,
    private readonly mailService: MailService,
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
      createdUser = await this.userService.create(user)
    } catch (err) {
      // TODO: Add detail of field
      throw new UserConflictError()
    }

    await this.mailService.sendRegistrationConfirmation(createdUser)

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
