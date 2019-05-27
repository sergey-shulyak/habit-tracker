import { Injectable, Inject } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from './jwt.service'
import { CryptoService } from './crypto.service'
import { IUser } from 'src/user/interfaces/user.interface'

@Injectable()
export class AuthService {
  public constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly cryptoService: CryptoService,
  ) {}

  public async validateUser(token: string) {
    return this.jwtService.verify(token)
  }

  public async signUp(userData: IUser) {
    const { email, name, password } = userData

    const user = {
      email,
      name,
      password: await this.cryptoService.hash(password),
    }

    await this.userService.create(user)

    // TODO: Send email
  }

  public async signIn(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email)

    const passwordsMatch = this.cryptoService.verify(password, user.password)

    if (!passwordsMatch) {
      // throw error
      return
    }

    return this.jwtService.sign({ email })
  }
}
