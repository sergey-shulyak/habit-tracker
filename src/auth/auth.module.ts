import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { CryptoService } from './crypto.service'
import { JwtService } from './jwt.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'
import { MailModule } from 'src/mail/mail.module'
import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from 'src/user/user.module'

@Module({
  imports: [
    PassportModule.register({ session: false }),
    UserModule,
    MailModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    // TODO: Add OAuth2
    JwtService,
    CryptoService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
