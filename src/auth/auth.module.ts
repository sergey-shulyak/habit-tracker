import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserModule } from 'src/user/user.module'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from './auth.controller'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'
import { JwtService } from './jwt.service'
import { CryptoService } from './crypto.service'

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    UserModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtService,
    CryptoService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
